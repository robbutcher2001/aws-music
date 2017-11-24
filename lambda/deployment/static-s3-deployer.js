'use strict';

const AWS = require('aws-sdk');
const fs = require('fs');
const unzip = require('yauzl');
const mkdirp = require('mkdirp');
const path = require('path');
const mime = require('mime-types');

exports.handler = (event, context, callback) => {
  let job = event['CodePipeline.job'];
  console.log('Got CodePipeline job', JSON.stringify(job));

  const s3Client = new AWS.S3({
    accessKeyId: job.data.artifactCredentials.accessKeyId,
    secretAccessKey: job.data.artifactCredentials.secretAccessKey,
    sessionToken: job.data.artifactCredentials.sessionToken,
    signatureVersion: 'v4'
  });

  let userParameters = JSON.parse(job.data.actionConfiguration.configuration.UserParameters);
  const s3Destination = new AWS.S3({
    region: userParameters.staticBucketRegion,
    params: {
      Bucket: userParameters.staticBucketName
    }
  });

  console.log('Artefacts to be uploaded to: ' + userParameters.staticBucketName);

  const sourceZipLocation = {
    Bucket: job.data.inputArtifacts[0].location.s3Location.bucketName,
    Key: job.data.inputArtifacts[0].location.s3Location.objectKey
  };

  const tokenisedS3Key = sourceZipLocation.Key.split(/\//);
  const zipName = tokenisedS3Key[tokenisedS3Key.length - 1];
  const workingSubfolder = '/tmp/' + zipName;
  const downloadedZip = fs.createWriteStream(workingSubfolder + '.zip');

  downloadZip(s3Client, sourceZipLocation, downloadedZip)
    .then(() => {
      console.log('Now extracting /dist folder source code..');
      return extractDistFiles(workingSubfolder, downloadedZip);
    })
    .then(distFiles => {
      console.log('Now uploading [' + distFiles.length + '] files..');
      return uploadFiles(s3Destination, distFiles);
    })
    .then(() => {
      return signalRomeoDone(job);
    })
    .then(() => {
      console.log('Romeo done');
      callback(null, 'Romeo done');
    })
    .catch(err => {
      signalRomeoNotDone(job, context, err).then(() => {
        console.log('Romeo NOT done');
        callback(err);
      });
    });
};

const downloadZip = (s3Client, sourceZipLocation, downloadedZip) => {
  return new Promise((resolve, reject) => {
    s3Client
      .getObject(sourceZipLocation)
      .on('httpData', function(chunk) {
        downloadedZip.write(chunk);
      })
      .on('httpError', function(err) {
        console.log('Could not download source code: ' + err);
        reject();
      })
      .on('httpDone', function() {
        downloadedZip.end();
        console.log('Downloaded source code: ' + downloadedZip.path);
        resolve();
      })
      .send();
  });
};

// Note, this is implementation from: https://github.com/thejoshwolfe/yauzl
const extractDistFiles = (workingSubfolder, downloadedZip) => {
  return new Promise((resolve, reject) => {
    // We will collect an array of AWS S3 keys and body content in distFiles
    const distFiles = [];
    unzip.open(downloadedZip.path, { autoclose: false, lazyEntries: true }, (err, zipfile) => {
      if (err) {
        reject();
      }
      // Initial iteration to check first zip file entry
      zipfile.readEntry();
      zipfile.on('entry', entry => {
        if (/\/$/.test(entry.fileName)) {
          // Directory file names end with '/'.
          // Note that entires for directories themselves are optional.
          // An entry's fileName implicitly requires its parent directories to exist.
          // Based on that, let's make the dir
          mkdirp(path.join(workingSubfolder, entry.fileName), err => {
            if (err) {
              reject();
            }
            // Iterate to next entry now this folder is processed
            zipfile.readEntry();
          });
        } else {
          // File entry
          zipfile.openReadStream(entry, (err, readStream) => {
            if (err) {
              reject();
            }
            // Double check parent dir exists
            mkdirp(path.join(workingSubfolder, path.dirname(entry.fileName)), err => {
              if (err) {
                reject();
              }
              // Now filter out anything that isn't inside /dist
              if (entry.fileName.startsWith('dist/')) {
                readStream.pipe(fs.createWriteStream(path.join(workingSubfolder, entry.fileName)));
                readStream.on('end', () => {
                  distFiles.push({
                    key: entry.fileName.replace('dist/', ''),
                    body: fs.createReadStream(path.join(workingSubfolder, entry.fileName))
                  });
                  // Iterate to next entry now this file/folder is processed
                  zipfile.readEntry();
                });
              } else {
                // Iterate to next entry as this file/folder was ignored
                zipfile.readEntry();
              }
            });
          });
        }
      });
      // Close file and resolve promise once we're done
      zipfile.once('end', () => {
        zipfile.close();
        resolve(distFiles);
      });
    });
  });
};

const uploadFiles = (s3Destination, distFiles) => {
  return Promise.all(
    distFiles.map(distFile => {
      console.log('Uploading: ' + distFile.key);
      const params = {
        Key: distFile.key,
        Body: distFile.body,
        ContentType: mime.contentType(path.extname(distFile.key))
      };
      return s3Destination.putObject(params).promise();
    })
  );
};

const signalRomeoDone = job => {
  const codePipeline = new AWS.CodePipeline();
  const params = {
    jobId: job.id
  };
  return codePipeline.putJobSuccessResult(params).promise();
};

const signalRomeoNotDone = (job, context, err) => {
  const codePipeline = new AWS.CodePipeline();
  const params = {
    jobId: job.id,
    failureDetails: {
      message: JSON.stringify(err),
      type: 'JobFailed',
      externalExecutionId: context.invokeid
    }
  };
  return codePipeline.putJobFailureResult(params).promise();
};

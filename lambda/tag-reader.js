'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3({apiVersion: '2006-03-01'});

exports.handler = (event, context, callback) => {

  console.log(JSON.stringify(event));

  const params = { 
    Bucket: "rob-dump-place", 
    Key: "Bear's Den/Islands/01 Agape.mp3"
  };

  // s3.getObject(params, function(err, data){   if (err) {
  //     console.error(err.code, "-", err.message);
  //     return callback(err);   }

  //   fs.writeFile('/tmp/filename', data.Body, function(err){
  //     if(err)
  //       console.log(err.code, "-", err.message);

  //     return callback(err);   
  //   }); 
  // });
};
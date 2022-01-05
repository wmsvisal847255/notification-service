'use strict';
var AWS = require('aws-sdk');
const CONSTANTS = require('./util/constants');

exports.sendNotification = async(event) => {
    // Create publish parameters
    var params = {
      Message: `Log at ${new Date()} \n------------------------------\n`,
      TopicArn: CONSTANTS.SNS_TOPICS.ERROR_LOGGER
    };
    
    if(event){
      params.Message += JSON.stringify(event);
    }
  
  
    // Create promise and SNS service object
    var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
  
    // Handle promise's fulfilled/rejected states
    publishTextPromise.then(
      function(data) {
        console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
        console.log("MessageID is " + data.MessageId);
        let response = {
          statusCode: 200,
          body: `success`,
          time: new Date()
        };
        callback(null,response);
      }).catch(
        function(err) {
        console.error(err, err.stack);
        let response = {
          statusCode: 500,
          body: `exit 1`,
          time: new Date(),
          error: JSON.stringify(err)
        };
        callback(null,response);
      });
}

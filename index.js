require('dotenv').config();
var stomp=require('stomp-client');
try{
  var stompClient = new stomp(
        process.env.ACTIVEMQ_HOST,
        process.env.ACTIVEMQ_PORT,
        process.env.ACTIVEMQ_USERNAME, 
        process.env.ACTIVEMQ_PASSWORD,
        '1.0',
        null,{
            delay:process.env.ACTIVEMQ_DELAY,
            retries:process.env.ACTIVEMQ_RETRIES
        }
    );
    stompClient.connect(function(sessionId){
        stompClient.subscribe('/queue/'+process.env.ACTIVEMQ_DESTINATION, function(body, headers){ 
              const phpRequest = require('request')
              
              var options = {
                method:'POST',
                body: body,
                url: headers.url,
                headers: {
                    "Content-Type": "application/xml"
                }
            }
            phpRequest(options, function (err, result, body) {

            });
        })
    });
}
catch(e){
  console.log(e.message);
}
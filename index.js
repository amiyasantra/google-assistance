"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const util = require('util')
const restService = express();

restService.use(
  bodyParser.urlencoded({
    extended: true
  })
);

restService.use(bodyParser.json());

restService.post("/echo", function(req, res) {
  var speech =
    req.body.queryResult &&
    req.body.queryResult.parameters &&
    req.body.queryResult.parameters.echoText
      ? req.body.queryResult.parameters.echoText
      : "Seems like some problem. Speak again.";
  
  var speechResponse = {
    google: {
      expectUserResponse: true,
      richResponse: {
        items: [
          {
            simpleResponse: {
              textToSpeech: speech
            }
          }
        ]
      }
    }
  };

console.log("heades************" + util.inspect(req.headers, {showHidden: false, depth: null}))
console.log("##########" + util.inspect(req.header, {showHidden: false, depth: null}))
// console.log("got an authorization**:..." + req.headers.authorization);
console.log("got an authorization****************:..." + util.inspect(req.body, {showHidden: false, depth: null}));
console.log("req accestoken*****..." + util.inspect(req.body.originalDetectIntentRequest.payload.user.accessToken, {showHidden: false, depth: null}));

  return res.json({
    payload: speechResponse,
    //data: speechResponse,
    fulfillmentText: speech,
    speech: speech,
    displayText: speech,
    source: "webhook-echo-sample"
  });
});

restService.listen(process.env.PORT || 8000, function() {
  console.log("Server up and listening");
});

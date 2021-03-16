//copy and paste this code segment into react-native code.
//this is not a local node.js server. This just passes a file to IBM online API 
//and returns a JSON as result

const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

var jsonOutput;
var audioInput='testing.mp3';
var audioType= 'audio/mp3'

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: 'oxYPY_HvfLBPZ3ocVGekgZaF2dSGqdLNPyKXoBta_Pdw',
  }),
  serviceUrl: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/f7e19bc0-3c10-4c59-9199-8122cb2533e1',
});

const recognizeParams = {
  audio: fs.createReadStream(audioInput),
  contentType: audioType,
  smartFormatting : false
};

speechToText.recognize(recognizeParams)
  .then(speechRecognitionResults => {
	jsonOutput = JSON.stringify(speechRecognitionResults, null, 2);
    console.log(jsonOutput);
  })
  .catch(err => {
    console.log('error:', err);
  });
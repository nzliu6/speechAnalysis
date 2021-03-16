const btn = document.getElementById('btn');

// const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// const recognition = new SpeechRecognition();

const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const recognition = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: 'oxYPY_HvfLBPZ3ocVGekgZaF2dSGqdLNPyKXoBta_Pdw',
  }),
  serviceUrl: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/f7e19bc0-3c10-4c59-9199-8122cb2533e1',
});

recognition.onstart = function(){
    console.log('You can speak now!!!');
}

recognition.onresult = function(event){
    var text = event.results[0][0].transcript;
    console.log(text);
    document.getElementById('result').innerHTML = text;
    read(text);
}

function read(text){
    var speech = new SpeechSynthesisUtterance();
    speech.text = text;
    window.speechSynthesis.speak(speech);
}
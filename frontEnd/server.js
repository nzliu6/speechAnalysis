//copy and paste this code segment into react-native code.
//this is not a local node.js server. This just passes a file to IBM online API 
//and returns a JSON as result

const fs = require('fs');
const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

var jsonOutput;

var resolve = require('path').resolve;


var audioDir = '../../../../../Library/Developer/CoreSimulator/Devices/131CAEDD-976F-48B3-9002-FEFFE629610A/data/Containers/Data/Application/CEC34220-3A4C-4364-85B7-2462C284A1B8/Documents/ExponentExperienceData/';
var folders = fs.readdirSync(audioDir)[0]


var absolute = 'file:///Users/Jiaqi/Library/Developer/CoreSimulator/Devices/131CAEDD-976F-48B3-9002-FEFFE629610A/data/Containers/Data/Application/CEC34220-3A4C-4364-85B7-2462C284A1B8/Library/Caches/ExponentExperienceData/%2540anonymous%252FfrontEnd-1b2aeec9-9d46-40fb-a993-ad55b2b22eb5/AV/recording-84B0A4D9-8E2B-4868-9A5F-B34E0F8C2CB2.caf'


var audioType= 'audio/wav'

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: 'oxYPY_HvfLBPZ3ocVGekgZaF2dSGqdLNPyKXoBta_Pdw',
  }),
  serviceUrl: 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/f7e19bc0-3c10-4c59-9199-8122cb2533e1',
});

console.log(audioDir+'/%40anonymous%2FfrontEnd-1b2aeec9-9d46-40fb-a993-ad55b2b22eb5/'+'small.wav');
const recognizeParams = {
  audio: fs.createReadStream(audioDir+'/%40anonymous%2FfrontEnd-1b2aeec9-9d46-40fb-a993-ad55b2b22eb5/'+'small.wav'),
  contentType: audioType,
  smartFormatting : false,
  timestamps: true
};

API_KEY='3mIz0ZMWMC-ucwBzGEqJV8BqW2teoQpWP9TY5ullsM4H'


const ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');

speechToText.recognize(recognizeParams)
  .then(speechRecognitionResults => {
    

    const tone_analyzer = new ToneAnalyzerV3({
      iam_apikey: '3mIz0ZMWMC-ucwBzGEqJV8BqW2teoQpWP9TY5ullsM4H',
      version: '2017-09-21',
      url: 'https://gateway.watsonplatform.net/tone-analyzer/api'
    });
    
    transcription = speechRecognitionResults.result.results[0]['alternatives'][0]['transcript'];
    date = speechRecognitionResults.headers.date;

    const text = transcription.replace("%HESITATION", "");
    const toneParams = {
      tone_input: { 'text': text },
      content_type: 'application/json',
    };

    tone_analyzer.tone(toneParams)
        .then(toneAnalysis => {
          toneAnalysis["transcript"] = transcription;
          toneAnalysis["date"] = date;
          writeFile = JSON.stringify(toneAnalysis, null, 2);
          fs.writeFile('speech_results.json', writeFile, function (err) {
            if (err) throw err;
            console.log('Saved!');
          });
        })
        .catch(err => {
          console.log('error:', err);
        });

	  jsonOutput = JSON.stringify(speechRecognitionResults, null, 2);


  })
  .catch(err => {
    console.log('error:', err);
  });

  TONE_ANALYZER_URL='https://api.us-south.tone-analyzer.watson.cloud.ibm.com/instances/90cfd093-a57b-474c-92c9-2a06d3d67fac'
  
  
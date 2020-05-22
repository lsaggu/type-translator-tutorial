// record.js is a custom module for handling the creation of an audio file from text (text-to-speech)
// this file will callout to the cloud text-to-speech api service provider

"use strict";

//required modules
const sdk = require("microsoft-cognitiveservices-speech-sdk"); //using speech resource on microsoft azure cloud
const tmp = require("tmp"); //temporary directory manager
const rp = require('request-promise');
const fs = require('fs');

//api keys
const subscriptionKey = process.env.AZURE_TTS_SUBSCRIPTION_KEY; //this is the microsoft cloud text-to-speech subscription key
const serviceRegion = process.env.AZURE_SERVICE_REGION; //this is the service region of your microsoft azure subscription


//create an XML SSML string
function createSsmlXMLString(text, voice, style, speed) {
    console.log('creating ssml xml string');

    var xml = fs.readFileSync('./public/audio/sample.xml', 'utf8');
    xml = xml.replace('_name', voice);
    xml = xml.replace('_text', text);
    if (style) {
        xml = xml.replace('_style', style);
    }
    if (speed) {
        xml = xml.replace('_speed', speed);
    }

    return xml;
}

//get a list of available voices to use with the microsoft speech service
async function getVoicesFromCloud(filePath) {
    //get access token
    const token_endpoint = 'https://' + serviceRegion + '.api.cognitive.microsoft.com/sts/v1.0/issueToken';
    let tokenOptions = {
        method: 'POST',
        uri: token_endpoint,
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey
        }
    };

    var token = await rp(tokenOptions);

    let voicesOptions = {
        method: 'GET',
        baseUrl: 'https://' + serviceRegion + '.tts.speech.microsoft.com/',
        url: 'cognitiveservices/voices/list',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }

    var request = await rp(voicesOptions).on('response', (response) => {
        if (response.statusCode === 200) {
            response.pipe(fs.createWriteStream(filePath));
            console.log('File is ready');
        }
    });

    //console.log(request);
}

function synthesizeSpeechToFile(text) {
    //create temporary file
    const tmpFile = tmp.fileSync({ tmpdir: './public/audio', postfix: '.wav' }); //this is the file name/location where the synthesized audio file will be saved
                                                       //microsoft uses .wav files as output - .wav is higher quality than .mp3 and better for editing/production
    
    // create the audio-config pointing to our stream and
    // the speech config specifying the language.
    var audioConfig = sdk.AudioConfig.fromAudioFileOutput(tmpFile.name); //setting tmp filename
    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

    var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    //create the speech synthesizer
    return new Promise((resolve, reject) => {
        synthesizer.speakTextAsync(text, result => {
            if (result) {
                console.log(JSON.stringify(result));
            }
            synthesizer.close();
            resolve(tmpFile.name); //return path of file
        }, error => {
            synthesizer.close();
            reject(error); //throw error
        });
    });

}

function synthesizeSsmlSpeechToFile(text, voice, style, speed) {
    //create temporary file
    const tmpFile = tmp.fileSync({ tmpdir: './public/audio', postfix: '.wav' }); //this is the file name/location where the synthesized audio file will be saved
    //microsoft uses .wav files as output - .wav is higher quality than .mp3 and better for editing/production

    // create the audio-config pointing to our stream and
    // the speech config specifying the language.
    var audioConfig = sdk.AudioConfig.fromAudioFileOutput(tmpFile.name); //setting tmp filename
    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

    //create XML string
    var ssml = createSsmlXMLString(text, voice, style, speed);
    
    var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    //create the speech synthesizer
    return new Promise((resolve, reject) => {
        synthesizer.speakSsmlAsync(ssml, result => {
            if (result) {
                if (result.errorDetails) {
                    console.log('Error:');
                    console.log(result.errorDetails);
                } else {
                    console.log(JSON.stringify(result));
                }
            }
            synthesizer.close();
            console.log('fileName:', tmpFile.name);
            resolve(tmpFile.name); //return path of file
        }, error => {
            synthesizer.close();
            reject(error); //throw error
        });
    });

}

function synthesizeSpeechToAudioStream(text) {
    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    //var audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput(); //fromDefaultSpeakerOutput is still in development by microsoft!

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    return new Promise((resolve, reject) => {
        synthesizer.speakTextAsync(text, result => {
            var audioData;

            if (result) {
                //capture audio ArrayBuffer data
                audioData = result.audioData;
                console.log(`Audio data byte size: ${audioData.byteLength}`);

                //console.log(JSON.stringify(result));
            }
            synthesizer.close();

            resolve(audioData); // return audioData ArrayBuffer
        }, error => {
            synthesizer.close();
            reject(error); // throw error
        });
    });
}

function synthesizeSsmlSpeechToAudioStream(text, voice, style, speed) {
    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    //var audioConfig = sdk.AudioConfig.fromDefaultSpeakerOutput(); //fromDefaultSpeakerOutput is still in development by microsoft!

    //create XML string
    var ssml = createSsmlXMLString(text, voice, style, speed);

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig);

    return new Promise((resolve, reject) => {
        synthesizer.speakSsmlAsync(ssml, result => {
            var audioData;

            if (result) {
                if (result.errorDetails) {
                    console.log('Error:');
                    console.log(result.errorDetails);
                } else {
                    //capture audio ArrayBuffer data
                    audioData = result.audioData;
                    console.log(`Audio data byte size: ${audioData.byteLength}`);

                    //console.log(JSON.stringify(result));
                }

            }
            synthesizer.close();

            resolve(audioData); // return audioData ArrayBuffer
        }, error => {
            synthesizer.close();
            reject(error); // throw error
        });
    });
}


//exported functions
module.exports = {

    getVoices: function (filePath) {
        console.log('running get voices');

        getVoicesFromCloud(filePath);
    },

    record: async function (text) {
        console.log('Recording!');

        let tmpFile = await synthesizeSpeechToFile(text);
        
        return tmpFile;
    },

    recordSsml: async function (text, voice, style, speed) {
        console.log('Recording SSML!');

        let tmpFile = await synthesizeSsmlSpeechToFile(text, voice, style, speed);

        return tmpFile;
    },

    play: async function (text) {
        console.log('Playing!');

        let audioData = await synthesizeSpeechToAudioStream(text);
        
        return audioData;
    },

    playSsml: async function (text, voice, style, speed) {
        console.log('Playing SSML!');

        let audioData = await synthesizeSsmlSpeechToAudioStream(text, voice, style, speed);

        return audioData;
    }

};
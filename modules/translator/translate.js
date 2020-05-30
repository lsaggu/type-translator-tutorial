// record.js is a custom module for handling the creation of an audio file from text (text-to-speech)
// this file will callout to the cloud text-to-speech api service provider

"use strict";

//required modules
const fs = require('fs');
const request = require('request'); //This module is DEPRECATED
const rp = require('request-promise');
const uuidv4 = require('uuid/v4');

//api keys
const subscriptionKey = process.env.AZURE_TRANSLATION_SUBSCRIPTION_KEY; //this is the microsoft cloud translator resource subscription key
const serviceRegion = process.env.AZURE_SERVICE_REGION; //this is the service region of the microsoft azure translator resource
const endpoint = 'https://api.cognitive.microsofttranslator.com/'; //this is the endpoint of the micorosft azure translator resource


//functions

//detect language based on given text
function detectLanguage(text) {
    let options = {
        method: 'POST',
        baseUrl: endpoint,
        url: 'detect',
        qs: {
            'api-version': '3.0',
        },
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        body: [{
            'text': text
        }],
        json: true,
    };

    return new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
            if (err) {
                console.log('Error');
                reject(err);
            }

            if (body.error) {
                console.log('Error', body.error.message);
                reject(body.error);
            }

            var data = JSON.stringify(body, null, 4);
            resolve(data);
        });
    });
}

//get a list of supported languages and save to a file
function getLanguages() {
    //define callout options
    let options = {
        method: 'GET',
        baseUrl: endpoint,
        url: 'languages',
        qs: {
            'api-version': '3.0',
        },
        headers: {
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        json: true,
    };

    
    return new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
            if (err) {
                console.log(err);
                reject(err);
            }


            if (body.error) {
                console.log('Error', body.error.message);
                reject(body.error);
            }

            console.log('Getting Languages...');
            var data = JSON.stringify(body, null, 4);
            resolve(data); //return the data
        });
    });
}

//translate text from specified language to specified language
function translateText(text, toLang) {
    let options = {
        method: 'POST',
        baseUrl: endpoint,
        url: 'translate',
        qs: {
            'api-version': '3.0',
            'to': [toLang]
        },
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        body: [{
            'text': text
        }],
        json: true,
    };

    return new Promise((resolve, reject) => {
        request(options, function (err, res, body) {
            if (err) {
                reject(err);
            }

            let data = JSON.stringify(body, null, 4);
            resolve(data);
        });
    });
}


//exported functions
module.exports = {

    getLanguages: async function () {
        let languages = await getLanguages();
        return languages;
    },

    detectLanguage: async function (text) {
        let detectedLanguage = await detectLanguage(text);
        return detectedLanguage;
    },

    translate: async function (text, toLang) {
        let translation = await translateText(text, toLang);
        return translation;
    },

};
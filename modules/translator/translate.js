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
const endpoint = process.env.AZURE_ENDPOINT; //this is the endpoint of the micorosft azure translator resource


//functions

//detect language based on given text
function detectLanguage(text) {

}

//get a list of supported languages and save to a file
function getLanguages() {
    //define callout options
    let options = {
        method: 'GET',
        baseUrl: 'https://api.cognitive.microsofttranslator.com/',
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
                reject(error);
            }

            console.log('Getting Languages...');
            var data = JSON.stringify(body, null, 4);
            resolve(data); //return the data
        });
    });
}

//translate text from specified language to specified language
function translateText(text, fromLang, toLang) {

}


//exported functions
module.exports = {

    getLanguages: async function () {
        let languages = await getLanguages();
        return languages;
    },

    detectLanguage: function (text) {
        //TODO
    },

    translate: function (text, fromLang, toLang) {
        console.log('running translate');
        console.log('Endpoint:', process.env.AZURE_ENDPOINT);
    },

};
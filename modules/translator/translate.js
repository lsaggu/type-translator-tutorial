// record.js is a custom module for handling the creation of an audio file from text (text-to-speech)
// this file will callout to the cloud text-to-speech api service provider

"use strict";

//required modules
const fs = require('fs');

//api keys
const subscriptionKey = process.env.AZURE_TTS_SUBSCRIPTION_KEY; //this is the microsoft cloud text-to-speech subscription key
const serviceRegion = process.env.AZURE_SERVICE_REGION; //this is the service region of your microsoft azure subscription


//functions


//exported functions
module.exports = {

    translate: function (text, fromLang, toLang) {
        console.log('running translate');
    },

};
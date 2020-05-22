# type-recorder

A Node.js app using [Express 4](http://expressjs.com/).

This application was built using the [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## About

This is (at the moment) a simple app for the purposes of learning about development. This is a Node.js app, and I use Visual Studio 2019 to develop it locally. 
The app is ultimately designed to be able to allow a user to enter a string on text and then create and download an audio clip of that text being read aloud.
This is still in development!

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ git clone https://github.com/lsaggu/type-recorder.git # or clone your own fork
$ cd type-recorder
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to the cloud

There are multiple cloud providers that can host this app

- Heroku
- Microsoft Azure
- AWS
- Google Cloud

## Documentation

For more information about using Node.js see below:

- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs) - This is how *type-recorder* got started
- [Best Practices for Node.js Development (on Heroku)](https://devcenter.heroku.com/articles/node-best-practices)
- [Node.js Routing](https://www.mydatahack.com/website-page-routing-with-node-js-express-and-ejs/)
- [EJS and Node.JS tutorial](https://medium.com/@bhanushali.mahesh3/creating-a-simple-website-with-node-js-express-and-ejs-view-engine-856382a4578f)

## Additional Project Resources

These are some additional resources that I want to callout - they greatly helped in making this project a reality!

- [Microsoft Azure: Text-to-Speech Basics](https://docs.microsoft.com/en-us/azure/cognitive-services/speech-service/text-to-speech-basics?tabs=import&pivots=programming-language-javascript)
- [Create a custom <audio> progress bar using Javascript](https://medium.com/@thomasmarren/create-a-custom-audio-progress-bar-using-javascript-51b358811abd)

### Stackoverflow

I, like many developers cannot thank this community enough. 

- [play .wav sound file encoded in base64 with javascript](https://stackoverflow.com/questions/17762763/play-wav-sound-file-encoded-in-base64-with-javascript)


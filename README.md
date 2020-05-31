# type-translator

A Node.js app using [Express 4](http://expressjs.com/).

This application was built using the [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## About

This is (at the moment) a simple app for the purposes of learning about development. This is a Node.js app hosted on Heroku that uses Microsoft Azure Translation services to translate text. I recommend use of Visual Studio Code to develop it locally.

This repository provides sample code for use in a tutorial on how to build a Node.js app. See the tutorial here:

- [Let's Build a Web App](https://blog.type-recorder.com/lets-build-a-web-app)

Please update styling and give credit to **type-recorder LLC** on your website when sharing. Please link to https://www.type-recorder.com and to this repository.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ git clone https://github.com/lsaggu/type-translator.git # or clone your own fork
$ cd type-recorder
```
Update the environment variables in the *./modules/translator/translate.js* file. Specifically, you need to update the **subscriptionKey** and **serviceRegion** variables on lines 13 and 14 respectively.
These values should come from your own [Microsoft Azure Translator](https://azure.microsoft.com/en-us/services/cognitive-services/translator/) resource.

```sh
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
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs) - This is how *type-recorder* and *type-translator* got started.
- [Best Practices for Node.js Development (on Heroku)](https://devcenter.heroku.com/articles/node-best-practices)
- [Node.js Routing](https://www.mydatahack.com/website-page-routing-with-node-js-express-and-ejs/)
- [EJS and Node.JS tutorial](https://medium.com/@bhanushali.mahesh3/creating-a-simple-website-with-node-js-express-and-ejs-view-engine-856382a4578f)

## Additional Project Resources

- [Microsoft Translation Quickstart](https://docs.microsoft.com/en-us/azure/cognitive-services/Translator/quickstart-translate?pivots=programming-language-javascript)
- [Microsoft Transliteration Quickstart](https://docs.microsoft.com/en-us/azure/cognitive-services/Translator/quickstart-transliterate?pivots=programming-language-javascript)
- [Microsoft Language Detection Quickstart](https://docs.microsoft.com/en-us/azure/cognitive-services/Translator/quickstart-detect?pivots=programming-language-javascript)
- [Microsoft Dictionary Quickstart](https://docs.microsoft.com/en-us/azure/cognitive-services/Translator/quickstart-dictionary?pivots=programming-language-javascript)

### Stack Overflow

I, like many developers cannot thank this community enough. 


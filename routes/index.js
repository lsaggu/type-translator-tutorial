// modules
const express = require('express');
//const base64 = require('base64-arraybuffer');
const fs = require('fs');
const translator = require('translator');

//app
const app = express();

// router
const router = express.Router();

//vars
const filePath = './public/files/languages.json';

router.get('/', async (req, res) => {

	//check if languages has been set
	if (!app.locals.languages) {
		//if languages file does not exist, create it
		if (!fs.existsSync(filePath)) {
			//create languages file
			try {
				let languages = await translator.getLanguages();
				fs.writeFileSync(filePath, languages);
			} catch (e) {
				console.log('error');
				console.log(e);
				res.sendStatus(500);
				return;
			}

			console.log('creating languages file');
		}

		console.log('updating languages');
		app.locals.languages = JSON.parse(fs.readFileSync('./public/files/languages.json'));
	}

	res.locals.languages = app.locals.languages;

	//render home
	res.render('pages/index');
});

router.get('/about', (req, res) => {
	res.render('pages/about');
});

//detect language of given text
router.get('/detect-language', async (req, res) => {
	var txt = req.query.message;
	var response;

	try {
		response = await translator.detectLanguage(txt);
	}
	catch (e) {
		console.log('error on detection');
		console.log(e);
		res.sendStatus(500);
		return;
	}

	//console.log('response', response);

	res.send(response);

});

//translate request routing
router.get('/translate', async (req, res) => {
	var txt = req.query.message;
	var toLang = req.query.to;

	try {
		//call translator module translate funtion
		let result = await translator.translate(txt, toLang);
		res.send(result); //send translation result back to client

	} catch (e) {
		console.log(e);
		res.sendStatus(500);
		return;
	}

});

//CURRENTLY UNUSED - The footer section needs to be updated to point to this route
router.get('/privacy-policy', (req, res) => {
	res.render('pages/privacy-policy'); //PLEASE UPDATE THE PIVACY-POLICY PAGE IF YOU PLAN TO USE IT
});

//CURRENTLY UNUSED - The footer section needs to be updated to point to this route
router.get('/terms-and-conditions', (req, res) => {
	res.render('pages/terms-and-conditions'); //PLEASE UPDATE THE TERMS-AND-CONDITIONS PAGE IF YOU PLAN TO USE IT
});


//export
module.exports = router;
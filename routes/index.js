// modules
const express = require('express');
const base64 = require('base64-arraybuffer');
const fs = require('fs');

//app
const app = express();

// router
const router = express.Router();

router.get('/', (req, res) => {
	//render home
	res.render('pages/index');
});

router.get('/about', (req, res) => {
	res.render('pages/about');
});

router.get('/privacy-policy', (req, res) => {
	res.render('pages/privacy-policy');
});

router.get('/terms-and-conditions', (req, res) => {
	res.render('pages/terms-and-conditions');
});

//translate request routing
router.get('/translate', async (req, res) => {
	var txt = req.query.message;
	var fromLang = req.query.from;
	var toLang = req.query.to;


	/*
	try {
		//call recorder module record funtion
		if (voice == 'standard') {
			tmpFile = await recorder.record(txt);
		} else {
			tmpFile = await recorder.recordSsml(txt, voice, style, speed);
		}

		res.send(tmpFile); //send filepath back to client

	} catch (e) {
		console.log(e);
		res.sendStatus(500);
		return;
	}
	*/

});


//export
module.exports = router;
// modules
const express = require('express');
const recorder = require('record');
const base64 = require('base64-arraybuffer');
const fs = require('fs');

//app
const app = express();

// router
const router = express.Router();

router.get('/', (req, res) => {

	if (!app.locals.voiceOptions) {
		//if voices file does not exist, create it
		if (!fs.existsSync('./public/audio/voices.json')) {
			//create voices file
			recorder.getVoices('./public/audio/voices.json');
			console.log('creating voice options');
		}
		console.log('updating voiceOptions');
		app.locals.voiceOptions = JSON.parse(fs.readFileSync('./public/audio/voices.json')); //set voice options var
	}

	res.locals.voiceOptions = app.locals.voiceOptions;

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

//record request routing
router.get('/record', async (req, res) => {
	var txt = req.query.message;
	var voice = req.query.voice;
	var style = req.query.style;
	var speed = req.query.speed;
	//console.log('style:', style);

	var tmpFile;

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

	//unlink the temporary file to save memory on disk
	/*
	 * Deleting file prevents download by client. TODO: Create a batch job for heroku server/dyno to clean up audio files regularly.
	 * 
		setTimeout(function () {
			fs.unlink(tmpFile, (err) => {
				if (err) {
					console.log('Error:', err);
				} else {
					console.log('Tmp file deleted');
				}
			});
		}, 5000);
	*/

});

//play request routing
router.get('/play', async (req, res) => {
	var txt = req.query.message;
	var voice = req.query.voice;
	var style = req.query.style;
	var speed = req.query.speed;
	//console.log('style:', style);
	
	try {
		//call recorder module play function
		let audioData;

		if (voice == 'standard') {
			audioData = await recorder.play(txt);
		} else {
			audioData = await recorder.playSsml(txt, voice, style, speed);
        }

		//convert ArrayBuffer to Base64 String
		var audioString = base64.encode(audioData);
		
		res.send(audioString); //send string to client
	} catch (e) {
		console.log(e);
		res.sendStatus(500);
		return;
	}
	
});

//export
module.exports = router;
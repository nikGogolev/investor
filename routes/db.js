var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');


const dbFile = path.resolve(__dirname, '../db/investDB.json');

router.post('/postItem/:ticker/:date', (req, res) => {
	fs.readFile(dbFile, 'utf-8', (err, data) => {
		if (err) {
		  res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
		} else {
			let currentDB = JSON.parse(data);
			if (req.params.ticker in currentDB){
				console.log('req.params.ticker in currentDB');
				currentDB[req.params.ticker][req.params.date] = req.body[req.params.date];
			} else {
				console.log('NOT');
				currentDB[req.params.ticker] = req.body;
			}
		  fs.writeFile(dbFile, JSON.stringify(currentDB, null, 4), (err) => {
			if (err) {
			  res.send('{"result": 0}');
			} else {
			  res.send('{"result": 1}');
			}
		  })
		}
	});

});

router.get('/getItem/:ticker/:date', (req, res) => {
	//console.log(req.params);
	//res.send('{"ticker": "SBER","cost": 329.71,"quantity": "2","total": 659.42}');

	fs.readFile(dbFile, 'utf-8', (err, data) => {
		if (err) {
			res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
		} else {
			const dataToSend = JSON.parse(data);
			
			if (dataToSend[req.params.ticker]){
				if (dataToSend[req.params.ticker][req.params.date]) {
					res.send(JSON.stringify(dataToSend[req.params.ticker][req.params.date]));
				} else {
					console.log('No data on thid date');
					res.send('{"result": 0}');
				}
			} else {
				console.log('No data on this ticker');
				res.send('{"result": 0}');
			}
		}
	});

});
 
module.exports = router;
var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');

/* GET users listing. */

router.get('/hello', function (req, res, next) {
    res.json('Greetings from API!');
	
});

const dbFile = path.resolve(__dirname, '../db/investDB.json');
const errorFile = path.resolve(__dirname, '../db/errors.json');
const errorTemp = JSON.stringify({t: 123});
 fs.writeFile(errorFile, errorTemp, (err) => {console.log(err);} );
router.post('/postItem', (req, res) => {
	fs.readFile(dbFile, 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
		let currentDB = JSON.parse(data);
		currentDB[req.body.ticker] = req.body;
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

router.get('/getItem/:ticker', (req, res) => {
	console.log(req.params);
	res.send('{"ticker": "SBER","cost": 329.71,"quantity": "2","total": 659.42}');
});
 
module.exports = router;
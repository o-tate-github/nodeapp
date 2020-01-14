'use strict';

const express = require('express');
const app = express();
const port = 3000;

function getCsv2JsonData(fileName) {
		const fs = require('fs');
		const csvSync = require('csv-parse/lib/sync');

		let data = fs.readFileSync(fileName);
		let dataObj = csvSync(data);

		let jsonData = '';
		dataObj.forEach(function (person, personIndex) {
			let propIndex = 0;
			let textBuffer = '';
			const colNames = ['Name', 'Score', 'Gender'];
			const isText = [true, false, true];
			person.forEach(function (propValue, propIndex) {
					if (propIndex != 0)
							textBuffer += ',';
					if (isText[propIndex]) {
							textBuffer += '\"' + colNames[propIndex] + '\":\"' + propValue + '\"';
					}
					else {
							textBuffer += '\"' + colNames[propIndex] + '\"' + ':' + propValue;
					}
			});
			if (personIndex != 0)
					jsonData += ',';
			jsonData += ('{' + textBuffer + '}');
		});
		jsonData = ('[' + jsonData + ']');
		return jsonData;
}

// Enabling CORS
app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	next();
});

app.get('/getData', async function(req, res) {
	  const jsonData = getCsv2JsonData(req.query.fileName);
		res.send(jsonData);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

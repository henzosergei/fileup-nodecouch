const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const NodeCouchDb = require('node-couchdb');

//pur require
const coments = require('./comments');

//upload
var formidable = require('formidable');

const couch = new NodeCouchDb({
	host: '192.168.8.11',
	protocol: 'http',
	port: 5984,
	auth: {
		user: 'admin',
		password: '14789632'
	}
});

const app = express();

//for html render
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static('public'));

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//start
app.listen(3000, function () {
	console.log('Server Started on Port 3000');
});

couch.listDatabases().then(function (dbs) {
	console.log(dbs);
});

//main
app.get('/', function (req, res) {
	res.render('index');
});

//addcom
app.post('/comentsfinal', function (req, res) {
	var form = new formidable.IncomingForm();
	coments.com_Add(couch, req, res, form);
});
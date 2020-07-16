const express = require('express');
const bodyParser = require('body-parser');
const date = require(`${__dirname}/date.js`);
const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

let newItems = ['Buy food', 'Cook food', 'Eat food'];
let workItems = [];

app.get('/', function (req, res) {
	let day = date.getDate();
	res.render('list', { listTitle: day, newItem: newItems });
});

app.post('/', function (req, res) {
	let newItem = req.body.newItem;
	// Check if from work list and if it is redirect back to work page same goes for home page list
	if (req.body.list === 'Work') {
		workItems.push(newItem);
		res.redirect('/work');
	} else {
		newItems.push(newItem);
		res.redirect('/');
	}
	/**
	 * What this does is save the value from the form on list.ejs in the newItem then it
	 * redirects to the app.get function where it'll be able to pass it back to the list.ejs file
	 */
});

app.get('/work', function (req, res) {
	let value = 'Work List';
	res.render('list', { listTitle: value, newItem: workItems });
});

app.get('/about', function (req, res) {
	res.render('about');
});

app.listen(3000, function () {
	console.log('Server started on port 3000');
});

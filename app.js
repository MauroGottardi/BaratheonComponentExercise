var express = require('express');
var path = require('path');

var app = express();

app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('*', function(req, res) {
  res.status(404).end();
});

app.listen(3333, function() {
  console.log('Server listening on port 3333');
});

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//connect to mongo database
//mongoose.connect('');
const app = express();
// use body parser middleware
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('Server running at port ' + PORT);
});

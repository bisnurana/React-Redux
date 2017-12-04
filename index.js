const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const router = require('./router');
//connect to mongo database
mongoose.connect(keys.mongoURI);
const app = express();
// use body parser middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// handle routes
router(app);
//server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log('Server running at port ' + PORT);
});

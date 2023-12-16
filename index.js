const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
app.use(express.static('public'));
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

app.get('/api/:date?', (req, res) => {
  const time = !isNaN(Number(req.params.date)) ? parseInt(req.params.date) : (req.params.date || Date.now());
  const date = new Date(time);
  const result = {};
  if(isNaN(date)) {
    result.error = "Invalid Date";
  } else {
    result.unix = parseInt(date.getTime());
    result.utc = date.toUTCString();
  }
  res.json(result);
});


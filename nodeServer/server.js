const express        = require('express');
const app            = express();
const port = 8080;
const path = require('path');
const bodyParser = require('body-parser');

const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
  };

app.use(cors(corsOptions));


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../usersModalForm')));

require('./routes')(app);

app.listen(port, () => {
  console.log('We are live on ' + port);
});

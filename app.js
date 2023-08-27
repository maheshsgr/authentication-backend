const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

const apiRoutes = require('./routes/apiRoutes');

//MongoDB config
require('./loaders/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(logger('dev'));

app.use('/api', apiRoutes);

app.listen(process.env.BACKEND_PORT, () => {
  console.log('server running');
});

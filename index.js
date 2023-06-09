const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

console.log(`MongoDB URI: ${process.env.MONGO_DB_URI}`);
console.log(`PORT is: ${process.env.PORT}`)

const Mongo = require('./setup/mongoose')

const app = express();
app.use(bodyParser.json());

const setup = async () => {
  await Mongo.setupDb(process.env.MONGO_DB_URI);

  app.listen(process.env.PORT, () => {
    console.log(`Server was started on ${process.env.PORT} PORT`);
  })
}

setup();
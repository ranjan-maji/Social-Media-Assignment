
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./route/routes');

const app = express();
app.use(bodyParser.json());


mongoose.connect("mongodb+srv://ranjan1:TjW1c4znKhEta2UO@cluster0.u4idw.mongodb.net/social_mediaApp?retryWrites=true&w=majority")

    .then(() => console.log('mongodb running on 3000'))
    .catch(err => console.log(err))

app.use('/', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

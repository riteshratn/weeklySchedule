const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const weekDataRoutes = require('./routes/weekDataRoutes');
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const dotenv = require('dotenv').config();

const app = express();

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.use('/api', weekDataRoutes);
app.use('/api',userRoutes);
app.use('/api', exerciseRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

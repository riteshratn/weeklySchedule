const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//version1
const weekDataRoutes = require('./routes/v1/weekDataRoutes');
const userRoutes = require('./routes/v1/userRoutes');
const exerciseRoutes = require('./routes/v1/exerciseRoutes');
const roughPadRoutes = require('./routes/v1/roughPadRoutes');
const notificationRoutes = require('./routes/v1/notificationRoutes');

//for updated version
const weekDataRoutes2 = require('./routes/v2/weekDataRoutes');
const userRoutes2 = require('./routes/v2/userRoutes');
const exerciseRoutes2 = require('./routes/v2/exerciseRoutes');
const roughPadRoutes2 = require('./routes/v2/roughPadRoutes');
const notificationRoutes2 = require('./routes/v2/notificationRoutes');

const dotenv = require('dotenv').config();

const { requestLogger, errorLogger } = require('./logger')

const app = express();
app.use(cors({
  origin: 'http://localhost:8000', //frontend app url
  methods: 'GET,PUT,POST,DELETE',
  credentials: true, 
}));

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

app.use((req, res, next) => {
  const logMessage = `${req.method} ${req.url}`;
  requestLogger.info(logMessage);
  next();
});

//version 1 apis
app.use('/api', weekDataRoutes);
app.use('/api',userRoutes);
app.use('/api', exerciseRoutes);
app.use('/api', roughPadRoutes);
app.use('/api',notificationRoutes);

//updated version apis
app.use('/api', weekDataRoutes2);
app.use('/api',userRoutes2);
app.use('/api', exerciseRoutes2);
app.use('/api', roughPadRoutes2);
app.use('/api',notificationRoutes2);

app.use((err, req, res, next) => {
  errorLogger.error(err.message);
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

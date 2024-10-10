const express = require('express');
const cors = require('cors');  // Import the cors package
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require('cookie-parser');

// Use CORS middleware
app.use(cors());

app.use(express.json());
app.use(cookieParser());

// Route imports
const products = require('./routes/product');
const auth = require('./routes/auth');
const order = require('./routes/order');

// Use routes
app.use('/api/v1/', products); 
app.use('/api/v1/', auth);
app.use('/api/v1', order);

// Middleware for error handling
app.use(errorMiddleware);

module.exports = app;

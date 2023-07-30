const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3333;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/test');

app.use(express.json())



const userRouter = require('./routes/user_routes');
app.use('/api/users', userRouter);

const thoughtRouter = require('./routes/thought_routes');
app.use('/api/thought', thoughtRouter);

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
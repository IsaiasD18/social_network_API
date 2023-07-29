const express = require('express');
const mongose = require('mongoose');

const PORT = process.env.PORT || 3333;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/test');

app.use(express.json())

app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });

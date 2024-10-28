//подключаем dotenv
require('dotenv').config();

// Подключаем express
const express = require('express');
const userRouter = require('./userRouter.js');


const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRouter);


app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
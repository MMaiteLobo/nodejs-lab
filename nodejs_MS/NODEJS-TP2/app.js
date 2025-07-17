const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
    console.log('Middleware 2');
    res.send('<h1>Hello TP2, from middleware 2 (/users)!</h1>');
});

app.use('/', (req, res, next) => {
    console.log('Middleware 1');
    res.send('<h1>Hello TP2, from middleware 1 (/)!</h1>');
});


app.listen(3004);
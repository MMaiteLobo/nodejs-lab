const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const users = [];

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res, next) => {
    res.render('index', {pageTitle: 'Add User'});
});

app.get('/users', (req, res, next) => {
    res.render('users', {
        pageTitle: 'User',
        users: users,
        hasUsers: users.length > 0
    });
});

app.post('/add-user', (req, res, next) => {
    users.push({name: req.body.username});
    res.redirect('/users');
});

app.listen(3004, () => {
    console.log('Server is running on port 3004');
});


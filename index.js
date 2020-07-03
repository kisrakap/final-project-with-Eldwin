const express = require('express');
const app = express();
const port = 4000;
const home = require('./routes/home');
const product = require('./routes/product');
const company = require('./routes/company');
const prodcompany = require('./routes/prodcom');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'keyboard',
    resave: false,
    saveUninitialized: false
}))

app.use('/', home);
app.use('/products', product)
app.use('/companies', company)
app.use('/productcompanies', prodcompany)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
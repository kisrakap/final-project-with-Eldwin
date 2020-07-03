const controller = require('../controllers/home');
const route = require('express').Router();

route.get('', controller.read);
route.get('/admin', (req, res, next) => {
    if(req.session.islogin){
        next();
    } else {
        req.session.error = `Belum Login`
        res.redirect(`/login`)
    }},controller.listadmin )
route.get('/login', controller.login )
route.post('/login', controller.loginpost )
route.get('/register', controller.register )
route.post('/register', controller.registerpost )
route.get('/logout', (req, res, next) => {
    if(req.session.islogin){
        next();
    } else {
        req.session.error = `Belum Login`
        res.redirect(`/login`)
    }}, controller.logout )

module.exports = route;
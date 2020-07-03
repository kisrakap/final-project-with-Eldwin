const route = require('express').Router();
const controller = require('../controllers/productcompany');

route.get('/:id/add', controller.add);
route.get('/:id/detail',(req, res, next) => {
    if(req.session.islogin){
        next();
    } else {
        req.session.error = `Belum Login`
        res.redirect(`/login`)
    }}, controller.detail);
route.post('/:id/add', controller.addPost);

module.exports = route;
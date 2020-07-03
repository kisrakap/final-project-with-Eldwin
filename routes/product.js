const route = require('express').Router();
const controller = require('../controllers/product');

route.get('', (req, res, next) => {
    if(req.session.islogin){
        next();
    } else {
        req.session.error = `Belum Login`
        res.redirect(`/login`)
    }}, controller.read);
route.get('/add', controller.add);
route.get('/:id/edit', controller.edit);
route.get('/:id/delete', controller.delete);
route.post('/add', controller.addPost);
route.post('/:id/edit', controller.editPost);


module.exports = route;
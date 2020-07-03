const route = require('express').Router();
const controller = require('../controllers/company');

route.get('',
 (req, res, next) => {
    if(req.session.isLogin){
        next();
    } else {
        req.session.error = `Don't have the authority`
        res.redirect(`/login?err=${error}`)
    }
},
controller.read);
route.get('/add', controller.add);
route.get('/:id/edit', controller.edit);
route.get('/:id/delete', controller.delete);
route.post('/add', controller.addPost);
route.post('/:id/edit', controller.editPost);

module.exports = route;

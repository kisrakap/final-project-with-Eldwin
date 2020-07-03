const { Product, Admin } = require('../models');
const priceSeparator = require('../helpers/priceSeperator');
const { compare } = require('../helpers/encrypt');

class Controller {
    static read(req, res){
        Product.findAll({order: [["price", "DESC"]]})
            .then(data => {
                res.render('homepage', {data, priceSeparator});
            })
            .catch(err => {
                res.send(err.message);
            })
    }

   
    static listadmin(req, res){
        Admin.findAll()
        .then(data => {
            res.render('admin', {data});
        })
        .catch(err => {
            res.send(err.message);
        })
    }

    static register(req, res){
        let error = req.session.error
        delete req.session.error
        res.render('register' , {error})
    }

    static registerpost(req, res){
        let { username, password, confirmpassword} = req.body

        if (password != confirmpassword){
            req.session.error = 'password tidak sama'
            res.redirect('/register')
        }
        else{
            let obj = {username, password}
            Admin.create(obj)
            
            .then( data =>{
            res.redirect('/login')
            })
            .catch(err =>{
                req.session.error = err.message
                res.redirect('/register')
            })
        }
        
    }

    static login(req, res){
            let error = req.session.error
            delete req.session.error
            res.render('login' , {error})
        }

    static loginpost(req, res){
       let {username, password} = req.body ;
        
       Admin.findOne({where: {username}})
       .then( data =>{
        if (data){
            if(compare(password, data.password )){
                req.session.islogin = true
                res.redirect('/')
            } else{
               
                req.session.error = "Password salah"
                res.redirect('/login')
            }
        }
        else{
            req.session.islogin = false
            req.session.error = 'password tidak sama boss'
            res.redirect('/login')
        }
       })
       .catch( err =>{
        req.session.error = err.message
        res.redirect('/login')
       })
    }

    static logout(req,res){
        delete req.session.islogin;
        res.redirect('/login')
    }
}

module.exports = Controller;
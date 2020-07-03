const { Product } = require('../models');
const priceSeparator = require('../helpers/priceSeperator');

class Controller {
    static read(req, res){
        Product.findAll({order: [["price", "DESC"]]})
            .then(data => {
                const error = req.query.err || ""
                delete req.query.err;
                res.render('product', {data, error, priceSeparator});
            })
            .catch(err => {
                res.send(err.message);
            })
    }

    static add(req, res){
        const error = req.query.err;
        delete req.query.err;
        res.render('addProduct', {error});
    }

    static addPost(req, res){
        const newProduct = {
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.create(newProduct)
            .then(data => {
                res.redirect('/products');
            })
            .catch(err => {
                let error = Product.error(err)

                if(error.length > 0){
                    res.redirect(`/products/add?err=${error}`);
                } else {
                    res.send(err.message);
                }
            })
    }

    static edit(req, res){
        Product.findByPk(req.params.id)
            .then(data => {
                const error = req.query.err;
                delete req.query.err;
                res.render('editProduct', {data, error});
            })
            .catch(err => {
                res.send(err.message);
            })
        
    }

    static editPost(req, res){
        const editProduct = {
            name: req.body.name,
            type: req.body.type,
            price: req.body.price,
            stock: req.body.stock
        }

        Product.update(editProduct, {where: {id: req.params.id}})
            .then(data => {
                res.redirect('/products');
            })
            .catch(err => {
                let error = Product.error(err)

                if(error.length > 0){
                    res.redirect(`/products/${req.params.id}/edit?err=${error}`);
                } else {
                    res.send(err.message);
                }
            })
    }

    static delete(req, res){
        Product.findByPk(req.params.id)
            .then(data => {
                if(data.stock === 0){
                    return Product.destroy({where: {id: data.id}})
                } else {
                    const error = `stock still more than 0`
                    res.redirect(`/products?err=${error}`);
                }
            })
        // Product.destroy({where: {id: req.params.id}})
            .then(data => {
                res.redirect('/products')
            })
            .catch(err => {
                res.send(err.message);
            })
    }
}

module.exports = Controller;
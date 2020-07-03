const { ProductCompany, Company, Product } = require('../models');
const priceSeparator = require('../helpers/priceSeperator');
const urlFormat = require('../helpers/urlformat');

class Controller {
    static add(req, res){
        let allProduct = [];
        Product.findAll()
            .then(product => {
                allProduct = product;
                return Company.findByPk(req.params.id, { 
                    include: ProductCompany
                 })
            }).then(data => {
                const errors = req.query.err || '';
                res.render('addProductCompany', { data, allProduct, priceSeparator, errors})
            }).catch(err => {
                res.send(err.message)
            })
    }

    static addPost(req, res) {
        let input = {
            productId: req.body.productId,
            companyId: req.params.id,
        }

        ProductCompany.create(input)
            .then(data => {
                res.redirect(`/productcompanies/${req.params.id}/add`)
            }).catch(err => {
                let error = ProductCompany.error(err)

                if(error.length > 0) {
                    res.redirect(`/productcompanies/${req.params.id}/add?err=${error}`)
                } else {
                    res.send(err.message)
                }
            })
    }

    static detail (req, res) {

            Product.findByPk(req.params.id, { 
                include: [
                    {model: ProductCompany, include: Company}
                ]
            })
            .then(data => {
                // res.send(data)
                res.render('detailProduct', { data, priceSeparator, urlFormat })
            }).catch(err => {
                res.send(err.message)
            })
    }
}

module.exports = Controller;
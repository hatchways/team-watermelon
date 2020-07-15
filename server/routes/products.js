const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const scrapingFunction = require('../utils/scrapingFunction.js');

const List = require('../models/List');
const Product = require('../models/Product');

const verifyToken = require('../middleware/verify');

const scrapePriceTag = async () => { 
	console.log("scraping every two minutes");
	Product.find({}).exec(async function(err, allProducts){
		if(err || !allProducts.length){
			console.log("error: No products for cron");
		} else {
			for await (const eachProduct of allProducts) {
				const productDetails = await scrapingFunction(eachProduct.url);
				if(productDetails) {
					const newPrice = parseFloat(product.price.trim().substring(1).replace(/,/g, ''));
					if(newPrice !== Number(eachProduct.currentprice)) {
						eachProduct.lastprice = eachProduct.currentprice;
						eachProduct.currentprice = newPrice;
						eachProduct.name = productDetails.title;
						eachProduct.description = productDetails.description;
						eachProduct.image = productDetails.image;
						eachProduct.save();
						console.log("success: Updated price "+ productDetails.price +" of "+productDetails.title);
					} else {
						console.log("error: Price did not change for "+productDetails.title);
					}
				}
			}
		}
	});
};
//'*/10 * * * *'
// const scrapingTime = cron.schedule('*/2 * * * *', scrapePriceTag);
// scrapingTime.destroy(); - add it to destroy scheduled task

// ADD new product
router.post('/lists/:id/products/new', verifyToken, async function (req, res) {
	List.findById(req.params.id, async function (err, foundList) {
		if (err) {
			res.status(400).send({ response: 'error: List not found.' });
			res.redirect('/lists');
		} else {
			let url = req.body.url;
			const product = await scrapingFunction(url);
			console.log(product);
			let price = parseFloat(product.price.trim().substring(1).replace(/,/g, ''));
			let description = '';
			if(typeof product.description === "string") {
				description = product.description;
			} else {
				description = product.description[0];
			}
			var newProduct = { name: product.title, image: product.image, description: description, url: url, lastprice: 0.0, currentprice: price };
			Product.create(newProduct, function (err, product) {
				if (err) {
					console.log(err);
					res.status(500).send({ response: 'error: Aw, Snap! Something went wrong.' });
				} else {
					foundList.products.push(product);
					foundList.save();
					console.log('success: Product added to list.');
					res.status(200).send({newProduct: product});
				}
			});
		}
	});
});

// DELETE product
router.delete('/lists/:id/products/:product_id', verifyToken, function (req, res) {
	Product.findByIdAndRemove(req.params.product_id, function (err, foundProduct) {
		if (err) {
			res.status(400).send({ response: 'error: Product not found.' });
		} else {
			List.findById(req.params.id, function (err, foundList) {
				if (err) {
					res.status(400).send({ response: 'error: Product not found.' });
				} else {
					//delete associated product id from products array of list too
					foundList.products.forEach(function (product, index) {
						if (product.equals(req.params.product_id)) {
							foundList.products.remove(product);
							foundList.save();
							res.status(200).send({});
						}
					});
				}
			});
			console.log(req.params.product_id,'Product deleted.');
		}
	});
});

module.exports = router;

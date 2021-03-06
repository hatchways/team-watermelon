const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const scrapingFunction = require('../utils/scrapingFunction.js');
const createAndEmitNotification = require('../middleware/createAndEmitNotification');
const List = require('../models/List');
const Product = require('../models/Product');
const User = require('../models/User.js');

const verifyToken = require('../middleware/verify');

const scrapePriceTag = async () => {
	console.log('price scraper started....');
	Product.find({}).exec(async function (err, allProducts) {
		if (err || !allProducts.length) {
			console.log('error: No products for cron');
		} else {
			for await (const eachProduct of allProducts) {
				const productDetails = await scrapingFunction(eachProduct.url);
				if (productDetails) {
					const newPrice = parseFloat(productDetails.price.trim().substring(1).replace(/,/g, ''));
					if (newPrice !== Number(eachProduct.currentprice)) {
						eachProduct.lastprice = eachProduct.currentprice;
						eachProduct.currentprice = newPrice;
						eachProduct.name = productDetails.title;
						let description = '';
						if (typeof productDetails.description === 'string') {
							description = productDetails.description;
						} else {
							description = productDetails.description[0];
						}
						eachProduct.description = description;
						eachProduct.image = productDetails.image;
						eachProduct.save();
						console.log('success: Updated price ' + productDetails.price + ' of ' + productDetails.title);

						if(eachProduct.user){
							createAndEmitNotification(
								global.io,
								"new price",
								eachProduct.user, 
								productDetails.title,
								productDetails.image,
								productDetails.description, 
								eachProduct.url,
								product={
									id:eachProduct._id,
									lastprice: eachProduct.lastprice,
									currentprice: newPrice
								},
								follower=null 
								);
						}
					} else {
						console.log('error: Price did not change for ' + productDetails.title);
					}
				}
			}
		}
	});
};

const scraperTime = async () => {
	try {
		let products = await Product.find({});
		console.log(`Total ${products.length} products fetched from DB`);
		let calculateScrapeTime = Math.ceil((products.length * 12) / 60);
		return calculateScrapeTime;
	}
	catch (err) {
		console.log('error: No products for cron');
	}
};

// Cron job runs every X minutes (time increased as no. of products increased) or default 10 minutes
scraperTime().then((time) => {
	console.log(`Calculated scraper time: every ${time} minutes`);
	cron.schedule(`*/${time} * * * *`, scrapePriceTag);
}).catch(() => {
	console.log('Default scraper time: every 10 minutes');
	cron.schedule('*/10 * * * *', scrapePriceTag);
});

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
			if (typeof product.description === 'string') {
				description = product.description;
			} else {
				description = product.description[0];
			}
			let newProduct = {
				name: product.title,
				image: product.image,
				description: description,
				url: url,
				lastprice: 0.0,
				currentprice: price,
				user:req.user.id
			};
			Product.create(newProduct, function (err, product) {
				if (err) {
					console.log(err);
					res.status(500).send({ response: 'error: Aw, Snap! Something went wrong.' });
				} else {
					foundList.products.push(product);
					foundList.save();
					console.log('success: Product added to list.');
					res.status(200).send({ newProduct: product });
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
			console.log(req.params.product_id, 'Product deleted.');
		}
	});
});

module.exports = router;

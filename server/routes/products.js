const express = require("express");
const router = express.Router();
const cron = require('node-cron');

const List = require("../models/List");
const Product = require("../models/Product");

const verifyToken = require("../middleware/verify");


const scrapePriceTag = () => { 
	console.log("scraping every two minutes");
	Product.find({}).exec(function(err, allProducts){
		if(err || !allProducts.length){
			console.log("error: No products for cron");
		} else {
			allProducts.forEach(function(eachProduct) {
				console.log(eachProduct.url);
				
			});
		}
	});
};
//'*/10 * * * *'
const scrapingTime = cron.schedule('*/2 * * * *', scrapePriceTag);
// scrapingTime.destroy(); - add it to destroy scheduled task



// ADD new product
router.post("/lists/:id/products/new", verifyToken, function(req, res) {
	List.findById(req.params.id, function(err, foundList) {
		if(err){
			res.status(400).send({response: "error: List not found."});
			res.redirect("/lists");
		} else {
			let url = req.body.url;
			let name = "tempProduct";
			let description = "tempDesc";
			let price = 23.46;
			// WEB SCRAPING FROM URL - SCRAPE name, description, price
			var newProduct = {name: name, description: description, url: url, lastprice: 0.0, currentprice: price};
			Product.create(newProduct, function(err, product) {
				if(err){
					res.status(500).send({response: "error: Aw, Snap! Something went wrong."});
				} else {
					foundList.products.push(product);
					foundList.save();
					console.log("success: Product added to list.");
					res.redirect("/lists/" + req.params.id);
				}
			});
		}
	});
});

// DELETE product
router.delete("/lists/:id/products/:product_id", verifyToken, function(req, res) {
	Product.findByIdAndRemove(req.params.product_id, function(err, foundProduct) {
		if(err){
			res.status(400).send({response: "error: Product not found."});
		} else {
			List.findById(req.params.id, function(err, foundList) {
				if(err){
					res.status(400).send({response: "error: Product not found."});
				} else { //delete associated product id from products array of list too
					foundList.products.forEach(function(product, index) {
						if(product.equals(req.params.product_id)) {
							foundList.products.remove(product);
							foundList.save();
						}
					});
				}
			});
			console.log("error: Product deleted.");
			res.redirect("/lists/" + req.params.id);
		}
	});
});

module.exports = router;

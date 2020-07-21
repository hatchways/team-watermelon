const express = require("express");
const router = express.Router();

const User = require("../models/User");
const List = require("../models/List");
const Product = require("../models/Product");

const verifyToken = require("../middleware/verify");
const createAndEmitNotification = require('../middleware/createAndEmitNotification');

// GET all lists of user
router.get("/lists", verifyToken, function (req, res) {
	User.findById(req.user.id).populate("my_lists").exec(function(err, foundUser) {
		if(err){
			res.status(400).send({response: "error: User not found."});
		} else {
			res.status(200).send({lists: foundUser.my_lists});
		}
	});
});

// GET one list of user
router.get("/lists/:id", verifyToken, function(req, res) {
	List.findById(req.params.id).populate("products").exec(function(err, foundList) {
		if(err){
			res.status(400).send({response: "error: List not found."});
		} else {
			res.status(200).send({list: foundList});

			//testing emiting msg to FE socket
			let startTesting = false;
			if(startTesting && foundList && foundList.products.length > 0){
				p = foundList.products[0]
				createAndEmitNotification(
					req.app.io,
					"new_price",//notification type
					req.user.id, // receiver id
					p.name,// the title on the notification
					p.image,// the image on the notification
					p.description, // the content on the notification
					p.url,// the link user can link to
					product={
						id:p._id,
						lastprice: p.lastprice,
						currentprice: p.currentprice
					},
					follower=null // follower's userId 
					);
			}
		}
	});
});

// CREATE list for user
router.post("/lists/new", verifyToken, function(req, res) {
    let title = req.body.title;
	let image = req.body.imageurl;
	let subtitle = req.body.listdescription;
	let user = {
		id: req.user.id,
		name: req.user.name
	};
	let newList = {title: title, image: image, subtitle: subtitle, user: user, products: []};
	List.create(newList, function(err, createdList){
		if(err){
			console.log(err);
			res.status(500).send({response: "error: Aw, Snap! Something went wrong."});
		} else {
			console.log("success: List created.");
			User.findById(req.user.id, function(err, foundUser) {
				if(err){
					res.status(400).send({response: "error: User not found."});
				} else {
					foundUser.my_lists.push(createdList);
					foundUser.save();
					res.status(200).send({list: createdList});
				}
			});
		}
	});
});

// UPDATE PUT list for user
router.put("/lists/:id", verifyToken, function(req, res) {
	let title = req.body.title;
	let image = req.body.imageurl;
	let subtitle = req.body.listdescription;
	let updateList = {title: title, image: image, subtitle: subtitle};
	List.findByIdAndUpdate(req.params.id, updateList, function(err, updatedList) {
		if(err){
			res.status(400).send({response: "error: List not found."});
		} else {
			List.findById(req.params.id, function(err,doc){
				if(err){
					res.status(400).send({response: "error: List can not be update."});
				} else{
					console.log("success: List updated.");
					res.status(200).send({list: doc});
				}
			});
		}
	});
});

// DELETE list for user
router.delete("/lists/:id", verifyToken, function(req, res) {
	User.findById(req.user.id, function(err, foundUser) {
		if(err){
			res.status(400).send({response: "error: User not found."});
		} else {
			if(foundUser.my_lists.includes(req.params.id)){
				foundUser.my_lists.pull(req.params.id);
				foundUser.save();
				List.findByIdAndRemove(req.params.id, function(err, foundList) {
					if(err){
						res.status(400).send({response: "error: List not found."});
					} else { // remove associated products with list too
						if(foundList.products.length>0){
							foundList.products.forEach(function(product) {
								Product.findByIdAndRemove(product, function(err) {
									if(err){
										res.status(400).send({response: "error: Product not found."});
									}
								});
							});
							res.status(200).send({});
						}else{
							res.status(200).send({});
						}
					}
				});
				
			}else{
				res.status(400).send({response: "error: list not found."});
			}
		}
	});
});

module.exports = router;

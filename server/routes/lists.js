const express = require("express");
const router = express.Router();

const User = require("../models/User");
const List = require("../models/List");
const Product = require("../models/Product");

const verifyToken = require("../middleware/verify");

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
					res.status(200).send({list_id: createdList._id});
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
			res.redirect("/lists");
		} else {
			console.log("success: List updated.");
			res.redirect("/lists/" + req.params.id);
		}
	});
});

// DELETE list for user
router.delete("/lists/:id", verifyToken, function(req, res) {
	List.findByIdAndRemove(req.params.id, function(err, foundList) {
		if(err){
			res.status(400).send({response: "error: List not found."});
			res.redirect("/lists");
		} else { // remove associated products with list too
			foundList.products.forEach(function(product) {
				Product.findByIdAndRemove(product, function(err) {
					if(err){
						res.status(400).send({response: "error: Product not found."});
						res.redirect("/lists");
					}
				});
			});
			console.log("error: List deleted.");
			res.redirect("/lists");
		}
	});
});

module.exports = router;

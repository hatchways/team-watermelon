const express = require("express");
const router = express.Router();

const List = require("../models/list");
const Product = require("../models/product");

// GET all lists
router.get("/lists", function (req, res, next) {
    List.find({}).sort({created: 'desc'}).exec(function(err, allLists) {
		if(err || !allLists.length) {
            console.log("error: No lists available.");
            console.log(err);
		} else {
			res.status(200).send({lists: allLists});
		}
	});
});

// GET one list
router.get("/lists/:id", function(req, res, next) {
	List.findById(req.params.id).populate("products").exec(function(err, foundList) {
		if(err){
			console.log("error: List not found.");
		} else {
			res.status(200).send({list: foundList});
		}
	});
});

// CREATE list
router.post("/lists/new", function(req, res, next) {
    let title = req.body.title;
	let image = req.body.imageurl;
	let subtitle = req.body.listdescription;
	/*let user = {
		id: req.user._id,
		username: req.user.username
	};user: user*/
	let newList = {title: title, image: image, subtitle: subtitle, products: []};
	List.create(newList, function(err, createdList){
		if(err){
            console.log("error: Aw, Snap! Something went wrong.");
            console.log(err);
		} else {
			console.log("success: List created.");
			res.redirect("/lists");
		}
	});
});

// UPDATE PUT list
router.put("/lists/:id", function(req, res, next) {
	let title = req.body.title;
	let image = req.body.imageurl;
	let subtitle = req.body.listdescription;
	let updateList = {title: title, image: image, subtitle: subtitle};
	List.findByIdAndUpdate(req.params.id, updateList, function(err, updatedList) {
		if(err){
			console.log("error: List not found.");
			res.redirect("/lists");
		} else {
			console.log("success: List updated.");
			res.redirect("/lists/" + req.params.id);
		}
	});
});

// DELETE list
router.delete("/lists/:id", function(req, res, next) {
	List.findByIdAndRemove(req.params.id, function(err, foundList) {
		if(err){
			console.log("error: List not found.");
			res.redirect("/lists");
		} else { // remove associated products with list too
			foundList.products.forEach(function(product) {
				Product.findByIdAndRemove(product, function(err) {
					if(err){
						console.log("error: Product not found.");
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

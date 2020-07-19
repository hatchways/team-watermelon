const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");

const verifyToken = require("../middleware/verify");


// GET all notifications for user
// private
router.get("/notifications", verifyToken, function (req, res) {
	Notification.find({user:req.user.id}).exec(function(err, docs) {
		if(err){
            console.log(err);
			res.status(400).send({response: "error: Notification not found."});
		} else {
			res.status(200).send({notifications: docs});
		}
	});
});

const blockExternalAccess = async (req, res, next) => {
    // console.log(req.headers);
	try {
		if (!req.headers.key || req.headers.key !== process.env.SECRET_KEY) {
			return res.status(403).json({ response: 'Not authorized to access this resource.' });
		}
		next();
	} catch (err) {
		return res.status(500).json({response: 'authorization confirmation failed'});
	}
};


// GET one notification by id
// internal system access
router.get("/notifications/:id", blockExternalAccess, function(req, res) {
	Notification.findById(req.params.id).exec(function(err, doc) {
		if(err){
			res.status(400).send({response: "error: Notification not found."});
		} else {
			res.status(200).send({notification: doc});

		}
	});
});


// CREATE notification for user
// internal system access
router.post("/notifications/new", blockExternalAccess, function(req, res) {

	Notification.create(req.body, function(err, doc){
		if(err){
			console.log(err);
			res.status(500).send({response: "error: Notificaion can't be created."});
		} else {
            res.status(200).send({notification: doc});
			console.log("success: Notification created.");
		}
	});
});

// UPDATE notification for user
// internal system access
// router.put("/notifications/:id", blockExternalAccess, (req, res) => {
//     Notification.findById(req.params.id)
//     .then((doc) => {
//         if (req.user && req.user.id.equals(doc.user)) {
//             doc.isRead = true;
//             doc.save()
//             .then((newDoc) => {
//                 res.status(200).send({notification: newDoc});
//             })
//             .catch(err=>res.status(403).send({response: "error: Notification can't be updated."}));
//         }
//         else {
//             res.status(403).send({response: "error: Notification " + req.params.id + ' is not for this user '});
//         }
//     })
//     .catch(
//         (err) => {
//             res.status(403).send({response: "error: Notification " + req.params.id + " not found."});
//             console.log(err);});
// })


router.put("/notifications/update", verifyToken, async (req, res)=>{
    try{
        const promise = await Notification.updateMany({ user: req.user.id, isRead:false }, { isRead: true });
        console.log(promise.nModified+" notifications are modified.");
        res.status(200).send({response:promise.nModified+" notifications are modified."});
    }catch(err){
        console.log(err);
        res.status(400).send({response: "error: Notification update failed."});
    }
});




module.exports = router;
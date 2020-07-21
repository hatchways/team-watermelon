const express = require("express");
const router = express.Router();

const Notification = require("../models/Notification");

const verifyToken = require("../middleware/verify");


// GET all notifications for user
// private
router.get("/notifications", verifyToken, function (req, res) {
	Notification.find({receiver:req.user.id}).exec(function(err, docs) {
		if(err){
            console.log(err);
			res.status(400).send({response: "error: Notification not found."});
		} else {
			res.status(200).send({notifications: docs});
		}
	});
});


// UPDATE a batch of notifications for user
// private
router.put("/notifications/updateAllRead", verifyToken, async (req, res)=>{
    try{
        const promise = await Notification.updateMany({ receiver: req.user.id, content:{isRead:false} }, { content:{isRead: true}});
        console.log(promise.nModified+" notifications are modified.");
        res.status(200).send({response:promise.nModified+" notifications are updated."});
    }catch(err){
        console.log(err);
        res.status(400).send({response: "error: Notification update failed."});
    }
});

// UPDATE notification for user
// private
router.put("/notifications/read/:id", verifyToken, async (req, res)=>{
    try{
		const doc = await Notification.findById(req.params.id).exec();
		if(doc.receiver.equals(req.user.id)){
			doc.content.isRead = true;
			const updatedDoc = await doc.save();
        	res.status(200).send({response:" notifications are updated."});
		}else{
			res.status(403).send({response:"error: update not authorized."})
		}
    }catch(err){
        console.log(err);
        res.status(400).send({response: "error: Notification update failed."});
    }
});



module.exports = router;
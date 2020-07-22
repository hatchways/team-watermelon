const Notification = require("../models/Notification");
const emitNotification = require('./emitNotification');

module.exports = createAndEmitNotification = async (socketIo,type,receiver,title,image,description,url,product,follower)=>{
    const newNotification =
    {
        notificationType: type,
        receiver: receiver,
        content:{
            title: title, 
            image: image, 
            description: description 
        }
    }
    if(url) 
        newNotification.content.url = url;
    if(product){
        newNotification.content.productId = product.id;
        newNotification.content.lastprice = product.lastprice;
        newNotification.content.currentprice = product.currentprice;
    }
    if(follower)
        newNotification.content.followerId = follower;
    Notification.create(newNotification, function(err, doc){
        if(err){
            console.log(err);
            return false
        } else {
            console.log("success: Notification created.");
            emitNotification(socketIo,"show_notification",doc)
        }
    });
};
 
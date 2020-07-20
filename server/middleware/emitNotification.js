// const Notification = require("../models/Notification");
module.exports = EmitNotification = async (socketio,channel,notification)=>{

    if(socketio.sockets.adapter.rooms[notification.receiver]){ // if user is online
        socketio.to(notification.receiver).emit(channel, {
            id:notification._id,
            type:notification.noti_type, 
            content: notification.content,
            createdTime:notification.createdAt
        }); 
        try{
            notification.isEmitted = true;
            updatedDoc = await notification.save();
            console.log("success: Notification emitted.");
            
        }catch(err){
            console.log(err);
        }
        
    }
    
};
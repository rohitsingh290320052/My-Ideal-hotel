
const socketIO = require('socket.io');

 const initsocket =(server)=>{
    const io=socketIO(server,{
        cors:{
            origin:'*',
            methods:['GET','POST'],
            allowedHeaders:['Content-Type'],
            credentials:true
            
        }
    })
    io.on('connection',(socket)=>{
        console.log('A user connected',socket.id);
        socket.on('disconnect',()=>{
            console.log('A user disconnected',socket.id);
        })
        socket.on('status',(data)=>{
            console.log('status',data);
            socket.emit('status',data);
        });
        

    })
    return io;
}
module.exports=initsocket;
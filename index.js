const http=require('http').createServer();

const io=require('socket.io')(http);
let data;
    data='{"week":[]}'
    data=JSON.parse(data);
    for(i=0;i<7;i++){
    let date=new Date();    
    date.setDate(date.getDate()+i);
    obj='{"data":'+date.getDate()+'.'+(date.getMonth()+1)+',"persons":[]}'
    data.week[i]=JSON.parse(obj);
}
function refreshDate(){
    let date=new Date();
    message=data;
        if(message.week[0].data!=date.getDate()+'.'+(date.getMonth()+1)){
            message.week.splice(0,1);
            date.setDate(date.getDate()+6);
            obj='{"data":'+date.getDate()+'.'+date.getMonth()+',"persons":[]}';
            message.week[6]=JSON.parse(obj);
            data=message;
            io.emit('message',data);
    }
}
setInterval(refreshDate,1000*60*24);
io.on('connection', (socket)=>{
    io.emit('message',data);
    socket.on('message',(message)=>{
        data=message;
        io.emit('message',message);
    })
})
http.listen(5000);

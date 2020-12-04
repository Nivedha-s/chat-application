 
const express = require('express')
const app = express()


//set the template engine ejs
app.set('view engine', 'ejs')

//middlewares
app.use(express.static('public'))


//routes
app.get('/', (req, res) => {
	res.render('page.ejs')
})

//Listen on port 3000
server = app.listen(3000)

const io = require("socket.io")(server)



//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')
    console.log(socket.id)
   
   io.sockets.emit('new_user');
   
   socket.on('user-name',(data) =>{
      
       socket.username=data.username
       socket.broadcast.emit('ppllist',{users : socket.username});
       
   })


    
    socket.on('disconnect',() =>{
        
        socket.broadcast.emit('left',{username:socket.username})
        
        console.log('1 disconnected')

    })
    
    
    
    
    var uname="";
    socket.on('new_message', (data) => {
        uname=data.name;
        io.sockets.emit('new_message', {message : data.message, name : data.name});
    })
    

    
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
   })
})
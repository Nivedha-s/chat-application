
$(function(){


    //make connection
 var socket = io.connect('http://localhost:3000')

 //create references of DOM elements
 var message = $("#message")
 var send_message = $("#send_message")
 var chatroom = $("#chatroom")
 var feedback = $("#feedback")
 
document.getElementById("user").innerHTML="";



socket.on('new_user',() => {
  socket.emit('user-name',{username:uname})
})



 send_message.click(function(){
     socket.emit('new_message', {message : message.val(),name:uname})
     console.log('button click')
 })

 socket.on("new_message", (data) => {
     feedback.html('');
     message.val('');
     chatroom.append("<div class='message'><div class='card bg-light' id='card'><div class='card-body'>" + data.name + ": " + data.message + "</div></div></div>")
 })


 socket.on('ppllist',(data) => {
   
      document.getElementById("user").innerHTML+= data.users + " joined" + "<br>";
 })

 socket.on('left',(data)=>{
   document.getElementById("user").innerHTML+=data.username + " left" + "<br>"
 })

 message.bind("keypress", () => {
  socket.emit('typing')
})


 socket.on('typing', (data) => {
     feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
 })
});
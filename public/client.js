// const socket = io();

let name1;
let textArea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message-area');
do{
   name1 = prompt('Plese enter your name');

} while(!name1);

textArea.addEventListener('keyup', (e) =>{
    if(e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});


function sendMessage(mssage){
  let msg = {
            user:name1,
            message: mssage.trim(),
  };

//Append 
appendMessage(msg, 'outgoing');
textArea.value = '';

 scroleToBottom();
// Send to server
// via web sockt connetctions
 socket.emit('message', msg)
 
}

function appendMessage(msg, type) {

           let mainDiv = document.createElement('div');
           let className = type;
           mainDiv.classList.add(className, "message");

let markup = `
         <h4>${msg.user}</h4>
         <p>${msg.message}</p>
`;


        mainDiv.innerHTML = markup;
        messageArea.appendChild(mainDiv);
} 


// recive message 

socket.on('message', () =>{
    appendMessage(msg, 'incomming');
    scroleToBottom();
})

//to scrole the div automatic

function scroleToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}
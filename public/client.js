const socket = io();

let name;
let textarea = document.querySelector('#textarea')
let send = document.querySelector('#send')

let message__area = document.querySelector('.message__area');
do{
    name = prompt("Please enter your name: ");
}while(!name);

send.addEventListener('click', (e) => {
    sendMessage(textarea.value);
})



function sendMessage(msg){
    let message = {
        name: name,
        message: msg.trim()
    }
    // Append the message to the chat
    appendMessage(message,'outgoing');
    textarea.value = '';
    scrollToBottom()

    // Send the message to the server
    socket.emit('message', message);
}


function appendMessage(msg, type){
    let mainDiv = document.createElement('div');
    let className = type
    mainDiv.classList.add(className, 'message');

    let markup = `
    <h4>${msg.name}</h4>
    <p>${msg.message}</p>
   `
    mainDiv.innerHTML = markup;
    message__area.appendChild(mainDiv);
}


// Receive message
socket.on('message', (msg) => {
    appendMessage(msg,'incoming');
    scrollToBottom()
} );

function scrollToBottom() {
    message__area.scrollTop = message__area.scrollHeight
}

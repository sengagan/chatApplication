// // grop

// 'use strict';

// const socket = io();
// let textarea = document.querySelector('#textarea');
// let messageArea = document.querySelector('.message_area');
// let name;
// do {
//     name = prompt(`Please enter your name:`);
//     console.log("name=",name);
// } while (!name);
// textarea.addEventListener('keyup', (e) => {
//     if (e.key === 'Enter') {
//         sendMessage(e.target.value);
//     }
// });

// function sendMessage(message) {
//     let msg = {
//         user: name,
//         message: message.trim(),
//     };

//     // append
//     appendMessage(msg, 'outgoing');
//     textarea.value = '';
//     scrollToBottom();

//     // send to server
//     socket.emit('message', msg);
// }

// function appendMessage(msg, type) {
//     let mainDiv = document.createElement('div');
//     let className = type;
//     mainDiv.classList.add(className, 'message');
//     let markup = `
//         <h4>${msg.user}</h4>
//         <p>${msg.message}</p>
//     `;
//     console.log("markup=",markup);
//     mainDiv.innerHTML = markup;
//     messageArea.appendChild(mainDiv);
// }

// socket.on('message', (msg) => {
//     console.log(msg,"incoming");
//     appendMessage(msg, 'incoming');
//     scrollToBottom();
// });

// // scroll to bottom
// function scrollToBottom() {
//     messageArea.scrollTop = messageArea.scrollHeight;
// }


//one to one chat

'use strict';

const socket = io();
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');
let name;

do {
    name = prompt(`Please enter your name:`);
} while (!name);

let room = prompt(`Enter room number:`);
socket.emit('joinRoom', room);

console.log("room===",room);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim(),
    };

    // Append the outgoing message without displaying it in the message area
    appendMessage(msg, 'outgoing');

    // Clear the textarea and scroll to the bottom
    textarea.value = '';
    scrollToBottom();

    
    // Emit the privateMessage event to send the message to the server
    socket.emit('privateMessage', { room: room, msg: msg });
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    // Check if the message is incoming or outgoing (from someone else or the current user)
    if (type === 'outgoing' || (type === 'incoming' && msg.user !== name)) {
        let markup = `
            <h4>${msg.user}</h4>
            <p>${msg.message}</p>
        `;
        console.log("markup====",markup);
        mainDiv.innerHTML = markup;
        messageArea.appendChild(mainDiv);
    }
}

socket.on('message', (msg,room) => {
    // Display incoming messages in the message area
    appendMessage(msg, 'incoming');
    console.log("receive/msg====",msg,room);
    scrollToBottom();
});

function scrollToBottom() {
    // Scroll the message area to the bottom
    messageArea.scrollTop = messageArea.scrollHeight;
}


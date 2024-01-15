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

// 'use strict';

// const socket = io();
// let textarea = document.querySelector('#textarea');
// let messageArea = document.querySelector('.message_area');
// let name;

// do {
//     name = prompt(`Please enter your name:`);
// } while (!name);

// let room = prompt(`Enter room number:`);
// socket.emit('joinRoom', room);

// console.log("room===",room);

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

//     // Append the outgoing message without displaying it in the message area
//     appendMessage(msg, 'outgoing');

//     // Clear the textarea and scroll to the bottom
//     textarea.value = '';
//     scrollToBottom();

    
//     // Emit the privateMessage event to send the message to the server
//     socket.emit('privateMessage', { room: room, msg: msg });
// }
// function appendMessage(msg, type) {
//     let mainDiv = document.createElement('div');
//     let className = type;
//     mainDiv.classList.add(className, 'message');
//     // Check if the message is incoming or outgoing (from someone else or the current user)
//     if (type === 'outgoing' || (type === 'incoming' && msg.user !== name)) {
//         let markup = `
//             <h4>${msg.user}</h4>
//             <p>${msg.message}</p>
//         `;
//         console.log("markup====",markup);
//         mainDiv.innerHTML = markup;
//         messageArea.appendChild(mainDiv);
//     }
// }
// socket.on('message', (msg,room) => {
//     // Display incoming messages in the message area
//     appendMessage(msg, 'incoming');
//     console.log("receive/msg====",msg,room);
//     scrollToBottom();
// });

// function scrollToBottom() {
//     // Scroll the message area to the bottom
//     messageArea.scrollTop = messageArea.scrollHeight;
// }


// client.js

'use strict';

const socket = io();
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');
let name;
let notificationBell = document.getElementById('notificationBell');
let unreadMessageCount = 0;

Notification.requestPermission();

do {
    name = prompt('Please enter your name:');
} while (!name);

let room = prompt('Enter room number:');
socket.emit('joinRoom', room);

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        sendMessage(e.target.value);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    unreadMessageCount = 0;
    updateNotificationBell();
});

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim(),
        status: 'unseen',
    };

    appendMessage(msg, 'outgoing');

    textarea.value = '';
    scrollToBottom();

    socket.emit('privateMessage', { room: room, msg: msg });
    socket.emit('notifyRecipient', { recipientRoom: room, sender: name, message: message });
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');

    if (type === 'outgoing' || (type === 'incoming' && msg.user !== name)) {
        let markup = `
            <h4>${msg.user}</h4>
            <p>${msg.message}</p>
            <span class="status">${msg.status}</span>
        `;
        mainDiv.innerHTML = markup;
        messageArea.appendChild(mainDiv);
    }
}

socket.on('message', (msg, room) => {
    msg.status = 'seen';
    appendMessage(msg, 'incoming');
    scrollToBottom();
    socket.emit('messageSeen', { room: room, messageId: msg.messageId });

    if (document.hidden) {
        unreadMessageCount += 1;
        updateNotificationBell();
        showNotification(`${msg.user}: ${msg.message}`);
    }
});

socket.on('messageSeen', (data) => {
    const messages = document.querySelectorAll('.message');
    messages.forEach((message) => {
        const messageId = message.querySelector('.status').textContent;
        if (messageId === data.messageId) {
            message.querySelector('.status').textContent = 'seen';
            message.querySelector('.status').classList.add('seen');
        }
    });
});

function chatBox(name, room, message) {
    const inputField = { name, room, message };
    socket.emit('sendTyping', inputField);
}

textarea.addEventListener('input', () => {
    chatBox(name, room, 'typing');
});

socket.on('typing', (data) => {
    let userList = document.querySelector('.user_list');
    userList.innerHTML = `<h3 class="typing">${data.name} is typing...</h3>`;
});

socket.on('stopTyping', () => {
    let userList = document.querySelector('.user_list');
    userList.innerHTML = '';
});

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
}

notificationBell.addEventListener('click', () => {
    // Corrected: 'click' instead of 'document.click()'
    document.click();
});

document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        notificationBell.style.color = '#128C7E';
    }
});

function updateNotificationBell() {
    if (unreadMessageCount > 0) {
        notificationBell.innerHTML = `🔔 Notifications (${unreadMessageCount})`;
        notificationBell.style.color = 'red';
    } else {
        notificationBell.innerHTML = '🔔 Notifications';
        notificationBell.style.color = '#128C7E';
    }
}

const messageElements = document.querySelectorAll('.message');
messageElements.forEach(messageElement => {
    const messageId = messageElement.dataset.messageId;

    messageElement.addEventListener('click', () => {
        updateMessageStatus(messageId, 'seen');
    });

    messageElement.addEventListener('dblclick', () => {
        updateMessageStatus(messageId, 'unseen');
    });
});

function updateMessageStatus(messageId, status) {
    // You need to implement this function to update the message status on the server
    // Example: socket.emit('updateMessageStatus', { messageId: messageId, status: status });
}

function showNotification(message) {
    if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification('New Message', {
            body: message,
            icon: 'path-to-your-icon.png'
        });

        setTimeout(() => {
            notification.close();
        }, 5000);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                showNotification(message);
            }
        });
    }
}

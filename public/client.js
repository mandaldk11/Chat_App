const socket = io();
let inputElem = document.querySelector(".publisher-input")
let userName;
let messageArea = document.querySelector("#chat-content")
do {
    userName = prompt('Enter your Name...')
} while (!userName);

inputElem.addEventListener('keyup', (e) => {
    if (e.key == 'Enter') {
        sendMessage(e.target.value)
    }
})

function sendMessage(message) {
    let msg = {
        user: userName,
        message: message.trim()
    }
    // append
    appendMessage(msg, 'media-chat-reverse')
    inputElem.value = ''
    scrollToBottom()

    // send to server -
    socket.emit('message', msg)

}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let classNames = type
    mainDiv.classList.add(classNames, "media", "media-chat")

    let markup = `<div class="media-body">
                    <h6>${msg.user}</h6>
                    <p>${msg.message}</p>
                   
                  </div>`
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv)
}

// recieve msg from server

socket.on('message', (msg) => {
    appendMessage(msg, 'media-chat');
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}
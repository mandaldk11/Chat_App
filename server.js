const express = require('express');
const server = express();
const app = require('http').createServer(server);
const io = require('socket.io')(app);
server.use(express.static("public"))



server.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})
io.on('connection', (socket) => {
    console.log('connect socket success..')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })
})


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})

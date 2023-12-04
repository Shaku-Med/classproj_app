const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const uuid = require('uuid')

let join = []

app.use(cors({
    origin: '*',
}))

app.use(bodyParser.json({ limit: '1000tb' }))
bodyParser.urlencoded({ extended: false, limit: '1000tb' })

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})

io.on('connection', (socket) => {
    socket.on('join', (data) => {
        socket.join(`${data.id}`)
        socket.join(socket.id)
            // 
        data.ip = socket.handshake.headers['x-forwarded-for']
        data.address = socket.handshake.address
        data.headers = socket.handshake.headers
        data.xdomain = socket.handshake.xdomain
        data.socketid = socket.id
            //

        let send = () => {
            // USE BROADCAST IF YOU WANT socket.broadcast.emit(). BROADCAST DOESN'T WORK FOR (IO) ONLY SOCKET. IO SENDS TO EVERYONE INCLUDING THE SENDER BUT SOCKET SENDS TO SPECIFIC PEOPLE OR DEVICES.
            // YOU CAN ALSO CHANGE / ENCRYPT YOUR TEXT INTO BINARY / RANDOM HEX TO MAKE YOUR RESPONSE UNREADABLE (new TextEncode().encode(*YOUR STRING DATA*))
            io.emit(`joined`, join)
        }

        let add = () => {
            join.push(data)
            send()
        }

        if (join.length > 0) {
            let j = join
                // 
            let fn = j.find(v => v.id === data.id)
            if (fn) {
                fn.ip = socket.handshake.address
                fn.headers = socket.handshake.headers
                fn.xdomain = socket.handshake.xdomain
                fn.socketid = socket.id
                    // 
                join = j
                send()
            } else {
                add()
            }
        } else {
            add()
        }
    });

    socket.on('view', (data) => {
        // THIS IS FOR THE ONES THAT DIDN'T SEND THEIR STREAM THAT THEY CAN WATCH OTHERS STREAM. THIS IS A TESTING PROJECT YOU CAN INCLUDE YOUR OWN FUNCTIONALITIES
        io.emit(`joined`, join)
    })

    socket.on('HeartBeat', () => {})

    socket.on('disconnect', () => {
        let j = join
        let ft = j.findIndex(v => v.socketid === socket.id)
        if (ft !== -1) {
            j.splice(ft, 1)
            join = j
                // 
            io.emit(`joined`, join)
        }
    })
})

server.listen(3001, () => {})
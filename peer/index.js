const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const uuid = require('uuid')
const { ExpressPeerServer } = require('peer')

let join = []

app.use(cors({
    origin: '*',
}))

app.use(bodyParser.json({ limit: '1000tb' }))
bodyParser.urlencoded({ extended: false, limit: '1000tb' })

const peerServer = ExpressPeerServer(server, {
    debug: true,
});

// PEER CONNECTION

app.use('/stream', peerServer)

server.listen(3002, () => {})
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const { exec } = require('child_process');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('message', (data) => {
        console.log("Mensaje recibido: " + data);
        if (data.startsWith("os:")) {
            const command = data.substring(3);
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    socket.emit('message', `Error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    socket.emit('message', `Error: ${stderr}`);
                    return;
                }
                socket.emit('message', stdout);
            });
        } else if (data.startsWith("js:")) {
            try {
                const jsCode = data.substring(3);
                const result = eval(jsCode);
                socket.emit('message', result);
            } catch (error) {
                socket.emit('message', `Error: ${error.message}`);
            }
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(PORT, () => {
    console.log(`Servidor Socket.IO escuchando en el puerto ${PORT}`);
});

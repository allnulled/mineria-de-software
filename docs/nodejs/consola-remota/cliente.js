const io = require('socket.io-client');
const readline = require('readline');

const SERVER_URL = 'http://localhost:3000';

const socket = io(SERVER_URL);

socket.on('connect', () => {
    console.log('Conectado al servidor Socket.IO');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.setPrompt('> ');
    rl.prompt();

    rl.on('line', (input) => {
        socket.emit('message', input);
        rl.prompt();
    });

    rl.on('close', () => {
        console.log('Desconectado del servidor Socket.IO');
        process.exit(0);
    });
});

socket.on('message', (message) => {
    console.log('Mensaje recibido del servidor:', message);
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor Socket.IO');
});

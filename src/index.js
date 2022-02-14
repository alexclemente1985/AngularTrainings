const server = require('./config/server');
const { Server } = require('socket.io');
const io = new Server(server,{
    cors:{
        origin: "http://localhost:4200"
    }
});

io.on('connection', (socket)=>{
    socket.on('message', (data)=>{
       
        //Tem que ser o io ao invés do socket, senão não aparece para todos
        io.emit('message',data);

        //Envio de mensagem direta pelo servidor, para todos do chat
        let sub = setInterval(()=>{
            /* io.to(socket.id).emit('message',
                {from: 'server', message: 'Hello from server!'}
            ); */
        },2000);

        //Quando tela for fechada
        socket.on('disconnect', ()=>{
            /* clearInterval(sub); */
            console.log(`Socket ${socket.id} has just disconnected`);
        });

        console.log(`Socket ${socket.id} has connected`);
    })
})

server.listen(4444,()=>{
    console.log('Listening on *: 4444');
})
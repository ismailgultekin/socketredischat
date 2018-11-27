const socketio            = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');


const io       =  socketio();//

const socketApi = {
    io
};


//libs
const Users    = require('./lib/Users');
const Rooms    = require('./lib/Rooms');
const Messages = require('./lib/Messages');

//socketio da middlaware yazmak icin io.use(); yazmaniz yeterli
//Her socket baglantisi calistiginda arada bu middleware olacak ara katman gorevini gorecek
io.use(socketAuthorization);

//Redis adapter kullanimi 6379 redis portudur
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
}));


io.on('connection', socket => {

    console.log("connection a loggin = " + socket.request.user.name);
    //redise kayit yapiyoruz
    Users.upsert(socket.id, socket.request.user);

    //userlari listeliyoruz
    Users.list(users => {
        //console.log(users);
        io.emit('onlineList', users);
    });

    //rediste cikis yapan kisinin giris bilgilerini siliyoruz
    socket.on('disconnect', () => {
       Users.remove(socket.request.user._id);
       console.log(socket.request.user._id);
    });


    //Oda Oluşturuyoruz
    socket.on('newRoom', (roomName) => {
        //redise oda kayit yapiyoruz
        Rooms.upsert(roomName);

        //roomlari listeliyoruz
        Rooms.list(rooms => {
            io.emit('roomList', rooms);
        });
    });

    //Mesaj ekliyoruz
    socket.on('newMessage', data => {
        //console.log(data);
        const messageData = {
            ...data,
            userId: socket.request.user._id,
            username: socket.request.user.name,
            surname: socket.request.user.surname,
        };

        Messages.upsert(messageData);
        //Mesajlarin anlik olarak odadaki tum kullanicilara gonderilmesi
        socket.broadcast.emit('receiveMessage', messageData);
    });

    //roomlari listeliyoruz
    Rooms.list(rooms => {
        //console.log(rooms);
        io.emit('roomList', rooms);
    });
});

module.exports =  socketApi;
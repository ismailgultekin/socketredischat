const shortid     = require('shortid');
const redisClient = require('../redisClient');


function Rooms () {
    this.client = redisClient.getClient()
};

module.exports = new Rooms();

//Redise Kayit ekliyor
Rooms.prototype.upsert = function (name) {
    const newId = shortid.generate();

    this.client.hset(
        'rooms',
        '@Room:'+newId,
        JSON.stringify({
            name,
            id:'@Room:'+newId,
            when: Date.now()
        }),
        err => {
            if (err) {
                console.error(err);
            }
        }
    )
};

//Rediste kayit siliyoruz
Rooms.prototype.remove = function (googleId) {
    this.client.hdel(
        'rooms',
        googleId,
        err => {
            if (err) {
                console.error(err);
            }
        }
    );
};

//Rediste kayitlari listeliyoruz
Rooms.prototype.list = function (callback) {
    let roomList = [];

    this.client.hgetall('rooms', function (err, rooms) {
        if (err) {
            console.error(err);
            return callback([]);
        }

        for (let room in rooms){
            roomList.push(JSON.parse(rooms[room]));
        }

        return callback(roomList);
    })
};
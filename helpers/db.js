const mongoose = require('mongoose');


module.exports = () => {
    mongoose.connect(process.env.DB_STRING, {  useNewUrlParser: true });
    //
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);




    mongoose.connection.on('open', () => {
        //console.log('MongoDB: Connected');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });

    mongoose.Promise = global.Promise;
};

/*
const mongoose = require('mongoose');

//useMongoClient: true,

module.exports = () => {
    mongoose.connect('mongodb://movie_user:abcd1234@ds033170.mlab.com:33170/movie-api', {  useNewUrlParser: true });
    mongoose.set('useCreateIndex', true);//hata ile yeni yazdim

    mongoose.connection.on('open', () => {
         console.log('MongoDB: Bağlantı sağlandı.');
    });
    mongoose.connection.on('error', (err) => {
        console.log('MongoDB: Error', err);
    });

    //calbeck ile cevap olaylarini promise cevirdik if yerine promise olaylari yani
    mongoose.Promise = global.Promise;
};


*/
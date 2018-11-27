npm install dotenv komutu ile terminalde kuruyoruz.
//hem local hem global olarak projemizi calistirmak icin dotenv app.js dosyamizda cagiriyoruz
    const dotenv = require('dotenv');
    dotenv.config();
kök dizinimizi .env text dökümantı oluşturup icine bilgileri giricez


Örnek kullanimi app.js icinde : console.log(process.env.NAME);

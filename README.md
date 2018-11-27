# socketredischat
socketredischat

package.json oluşturma
npm init -y komutu ile oluturuyoruz

express kurulumu (generator)
express . ilk once komutlari ile express kurulumu bakiyoruz
sudo npm install express-generator -g --save komutu ile kuruyoruz
express . --view=pug ile pug kuruyoruz
npm install ile node modullerini kuruyoruz

Nodemon kurulumu -g (global kuruyor) -D ise local yazılım denemeleri icin kuruluyor.
sudo npm install nodemon -g nodemonu kuruyoruz

kurulumu degilmi -v (ornek npm nodemon -v)

bower kuruyoruz(Angularjs felan dahil etmemiz icin yani )
npm install bower -g = kurulu degilse global
bower init

passport paket kurulumlari
    - npm install passport passport-google-oauth20 --save

express-session kullanımı
    - npm install express-session --save
    app.js dosyasinda const session = require('express-session');
    app.js dosyasinda express-session olan yerleri incele

Middleware giriş yapılmışmı kontolunu yapar

redis kurulumu 2 adet module ihtiyacimiz var derlemek icin make & gcc
    install brew install redis
        - brew install make gcc
        - make komutunu çalıştır.
        - src/redis-cli -v / versiyon kontrolu var mi?
        - src/redis-server
        - src/redis-cli
        - brew services restart redis
        - brew services list
        - brew services start redis
        - brew services stop redis
    connect-redis Kurulum ve kullanimi
        - npm install connect-redis {express-session yoksa onuda yazalim} --save
        - kullanimi ise
            - helpers/redisStore.js oluşturuyoruz
            - app.js dosyamizda include ettinkten sonra sadece store kismini yaziyoruz:
                - app.use(session({ store: redisStore }

socket.io kurulumu
    - npm install socket.io --save komutu ile kuruyoruz.
    - src/socketApi.js dosyasi olusturup
    - bin/www dosyasinda socketio attach yapmmamiz gerekiyor
    - views/chat.pug socket.io.js script olarak yayinla
    - public/javascripts/controller/chatController.js

socket.IO Redis Adapter Kurulumu
    //Redis ile birden fazla sunucuda kullanicilara ortak veri paylasımını sağlar
    - npm install socket.io-redis --save
    - src/socketApi.js icinde
        - //Redis adapter kullanimi 6379 redis portudur
        - const redisAdapter = require('socket.io-redis');
        - eski = io.adapter(redisAdapter({ host:'localhost', port:'6379'}));
        - yeni = io.adapter(redisAdapter({ host: process.env.REDIS_URI, port: process.env.REDIS_PORT}));
            - env kullandik kok diiznde .env dosyasinda port ve sifreler

Giriş yapmış kullanıcının bilgilerini socket.io ile  taşima kullanimi ve kurulumu
    - npm install passport.socketio --save
        - middleware/socketAuthorization.js dosyasinda
        - src/socketApi.js dosyasinda cagirip projeye dahil ediyoruz
            - socketio da middlaware yazmak icin io.use(); yazmaniz yeterli
            - Her socket baglantisi calistiginda arada bu middleware olacak ara katman gorevini gorecek


Redis işlemleri
    Giriş yapmis kullanicin bilgilerini REDİS`E kaydediyoruz
        - src/lib/Users.js dosyamizda src/socketApi.js`den upsert ile gelen veriyi redise kaydediyoruz
   **(çalismiyore) Cıkış yapan kullanici bilgilerini silicez
        - src/lib/Users.js dosyamizda src/socketApi.js`den remove ile gelen veriyi redisten siliyoruz
    user olanlari listeliyoruz
        - src/lib/Users.js dosyamizda src/socketApi.js`den list comutu ile redisten listeliyoruz

Redis için id oluşturucu
    - npm install shortid --save kuruyoruz
        - src/lib/Rooms.js de include ediyoruz ve shortid olarak kullaniyoruz shortid.genarate();

lodash kurulum ve kullanım
    - npm install lodash --save
    - lodash verileri sıralama yapiyor order by gibi asc veya desc gibi dusunun
    Kullañimi
        - const lodash = require('lodash');
        - lodash.orderBy(messageList, 'when', 'asc');
        - messagelistesini when sutununun asc ile listeledik

ayni data varsa yeniden istek yollatmayalim hasOwnProperty(): metodu ile


kok dizin 3000 port betimi public/javascripts/main.js


app.js ve index.html arasinda veri gonderip karşiliyoruz
    socket.on ile karşılıyoruz
    socket.emit ile gönderiyoruz
    broadcast kontrolü ile emitten farkli olarak diger tum kullanicilara mesaj gonderdik
    broadcast.html ve broadcas.js
    kullanimi ise socket.broadcast.emit(); komutu
    namespace yani url (/) kok dizin yerine (/namespace) yol vererek çalıştırdık
    app.js dosymizda const nsp = io.of('/93creative'); of foksiyonu ile yaptik
    join odaya giriş leave(); ise odadan cıkış metotlarini isledik
    //socked.id kullanimi console.log(socket.id);
    odalari listelemek icin Object.keys(socket.rooms);

connect baglanma ayarlari
    io.connect('http://localhost:3000/', {
                reconnectionAttempts: 4,//Kaç kere bağlansin
                reconnectionDelay: 3000,//Kac saniyede bir bağlansin
                // reconnection: false //ilk baglanmayi yapamazsa birdaha baglanmasin
    });

connect portuna bağlanmayı yakala
            socket.on('reconnect_attempt', function() {
                console.log('Yeniden bağlanmaya çalışılıyor.');
            });
            socket.on('reconnect_error', function() {
                setTimeout(() => {
                    console.log('Yeniden bağlanma başarısız.');
                },1500);
            });

            socket.on('reconnect', function() {
                console.log('Yeniden bağlanma başarılı.');
            });

Nesneleri birleştime operatoru assign kullanimi
Object.assign(data1, Data2)
array'a veri eklemek arrayadi.push(eklenecekarraybilgisi);

Git kontrolleri
    .gitignore loglarin hemen altina .idea/ yaziyoruz .idea/ klasorunu silip push edicez
        - git clone https://github.com/ismailgultekin/websocketio.git . komutu ile clone repo adresmizi veriypruz
        - git status {ile hangi dosyada degisiklik yaptimizi buluyoruz.}
        - git add . {proje klasorundeki tum dosyalari
        - git commit -m "aciklama yaz" {aciklama yazarak versiyonu takip edebiliriz}
        - git push origin master {git hesabimiza push ediyoruz}

//ortamdegiskenlerini kontrol edicez
    //Site localde ve internette calismasi icin ayri connecti yapiyoruz
        1) routes/index.js router.get('/getEnv', function(req, res, next)
        2) config/env.json local ve internet baglatimizi belirtiyoruz
        3) public/javascripts/services/configFactory.js ile http kontrolu yapiyoruz
        4) views/layout.pug dosyasinda script(src='/javascripts/services/configFactory.js') ekliyoruz
        5) public/javascripts/controller/indexController.js  configFactory olarak kullandik







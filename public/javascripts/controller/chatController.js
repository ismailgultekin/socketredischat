 app.controller('chatController', ['$scope', 'userFactory', 'chatFactory', ($scope, userFactory, chatFactory) => {

     /**
      *
      * initalization
      */

     function init() {
         userFactory.getUser().then(user => {
            //console.log(user);
            $scope.user = user;
         });
     }

     init();

     //console.log('chatselam');
     $scope.onlineList  = [];
     $scope.roomList    = [];
     $scope.activeTab   = 1;
     $scope.chatClicked = false;
     $scope.loadingMessages = false;
     $scope.chatName    = "";
     $scope.roomId      = "";
     $scope.message     = "";
     $scope.messages    = [];

     $scope.user        = {};


     const socket = io.connect("http://localhost:3000");

     //online kullanicilari listeliyoruz
     socket.on('onlineList', users => {
         //console.log(users);
         $scope.onlineList = users;
         $scope.$apply();
     });

     //online odalari listeliyoruz
     socket.on('roomList', rooms => {
         //console.log(users);
         $scope.roomList = rooms;
         $scope.$apply();
     });

     //Mesajlarin anlik olarak odadaki tum kullanicilara gonderilmesi
     socket.on('receiveMessage', data => {
         console.log(data);
         $scope.messages[data.roomId].push({
             userId:data.userId,
             username:data.username,
             surname:data.surname,
             message: data.message
         });

         $scope.$apply();
     });

     //mesaj göndere tiklandiginda
     $scope.newMessage = () => {
        //console.log($scope.message + " " +$scope.roomId);
        if($scope.message.trim() !== '') {
            socket.emit('newMessage', {
                message: $scope.message,
                roomId: $scope.roomId
            });

            //mesaj yazdiginda sayfa yenilenmeden client tarafinda hemen gosterdik mesaji
            $scope.messages[$scope.roomId].push({
                userId:$scope.user._id,
                username:$scope.user.name,
                surname:$scope.user.surname,
                message: $scope.message
            });

            $scope.message = "";
            //console.log($scope.user);
        }
     };

     //Odaya tiklandiginda sag tarafta ilgili odayi getir
     $scope.switchRoom = room => {
         //console.log(room);
         $scope.chatClicked = true;
         $scope.loadingMessages = true;
         $scope.chatName    = room.name;
         $scope.roomId      = room.id;

         //ayni data varsa yeniden istek yollatmayalim hasOwnProperty
         if(!$scope.messages.hasOwnProperty(room.id)) {
             //ilgili odanin kayitli mesajlari
             chatFactory.getMessages(room.id).then(data => {
                 //console.log(data);
                 $scope.messages[room.id] = data;
                 $scope.loadingMessages = false;
             });
         }
     };
     //Yeni oda oluşturuyoruz
     $scope.newRoom =  () => {
         //const randomName = Math.random().toString(36).substring(7);

         let roomName = window.prompt("Enter room name");
         if (roomName !== '' && roomName !== null) {
             socket.emit('newRoom', roomName);
         }
     };


     $scope.changeTab  = tab => {
         $scope.activeTab = tab;
     };


 }]);
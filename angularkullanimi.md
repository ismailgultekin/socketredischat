node projelerimize angular dahil etmek istiyorsak
    -- ilk önce kuruyoruz kok dizinimizde bir klasör altinda

        1) public/javascipts/main.js olusturuyoruz
            -main.js dosyamiza aşagidaki kodu yaziyoruz.
                - const app = angular.module('socketredischat', []);
        2) views klasörü altinda bulunan layout.pug dosyamizda mainjs ve angularjs dahil ediyoruz
            a- script(src="/angular/angular.min.js")
            a- script(src="/javascripts/main.js")
            b- Sayfanin(body) en basinda ng-app=("angularmoduladi") cagiriyoruz
                - div(ng-app="socketredischat")
        3) Kök dizinde app.js dosyamizda angulardosyalarinin bulundugu dizini public oldugunu belirtiyoruz
            a) bizde angular dosylari bower_components klasörü altinda bulunuyor
                - app.use(express.static(path.join(__dirname, 'bower_components')));
        4) views klasörü altinda bulunan layout.pug dosyamizda ng-cloak modulu ile compile edilmeyenleri derlesin diye yaziyoruz
            - div(ng-app="socketredischat", ng-cloak)

    -- angular control dosyamizin kullanimi
        1) views klasörü altinda bulunan index.pug dosyamizda
            a- div(ng-controller="indexController") //kodlarini en ust dive yaziyoruz
            a- script(src="/javascripts/controller/indexController.js")
            b- javascripts/controller/indexController.js oluşturup icine ng-controllere tanimladigimiz indexController adini veriyoruz
            b- app.controller('indexController', ['$scope', ($scope) => { console.log('selam') }]);

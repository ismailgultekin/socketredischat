function isAuthenticated(req, res, next){
    if (req.isAuthenticated())
        next();//olumlu ise bir sonrakine yonlensin
    else
        res.redirect('/');//olumsuz ise anasayfaya veya tekrar giris yapilmasini istediginiz sayfaya yonlensin
}

module.exports = isAuthenticated;
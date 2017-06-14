const url = 'mongodb://alexitouuu:12345@ds125262.mlab.com:25262/siadcon';
const mongo = require('mongodb').MongoClient;
const fs = require('fs');
const path = require('path');
const upload = require('../public/uploads/rute');
const db = require('./mongo');

module.exports ={
    getSignUp: function (req, res, netx){
        res.render('user/signup',{
        title : 'Registro',
        isAuthenticated : req.isAuthenticated(),
         user : req.user});
        console.log(`> Sirviendo Signup`);
    },

    postSignUp: function(req, res, netx){
            mongo.connect(url,function(err,db){
            var collection = db.collection('condominios');
            collection.insert(req.body,(err,data)=>{
                if (err) throw err; 
                console.log(data); 
            });
        });
        console.log(`> Redireccionando a Singin`);
        req.flash('info','Se ha registrado correctamente, ya puede iniciar sesión')
        return res.redirect('/user/signin');
      },

      getSignIn: function(req, res, netx){
         res.render('user/signin',{
         message: req.flash('info'),
         autenticacion: req.flash('autenticacion'),
         title : 'Inicio de Sesion',
         isAuthenticated : req.isAuthenticated(),
         user : req.user});
         console.log(`> Sirviendo SignIn`);
      },

      logOut: function(req, res, netx){
          req.logout();
          res.redirect('/')
      },

      getUserPanel: function(req, res, netx){
         res.render('user/panel',{
         isAuthenticated : req.isAuthenticated(),
         user : req.user,
         title : 'Panel de Usuario'});
        console.log(`> Sirviendo Panel de Usuario`); 
      },

      upLoad: function(req, res, netx){
	    fs.readFile(req.files.archivo.path, function(err, data){
		var nameImagen = req.files.archivo.name;
		console.log(data);
		if(err) {
			console.log('Sucedio un error: ' + err);
		}
		else {
			console.log('nombre de mi imagen es: ' + nameImagen);
			var nuevoDirectory = upload.dirname + '/' + nameImagen;
			fs.writeFile(nuevoDirectory, data, function(err){
				if(err) {
					console.log(err); 
				}
				else {
                    console.log(nuevoDirectory);
					res.redirect('/user/panel');
				}
			});
		}
		

	});
    }
      
}
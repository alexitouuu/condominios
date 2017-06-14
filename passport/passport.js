const localStrategy = require('passport-local').Strategy,
      mongo = require('mongodb').MongoClient,
      url = 'mongodb://alexitouuu:12345@ds125262.mlab.com:25262/siadcon';

module.exports = function(passport){
    passport.serializeUser(function(user,done){
        done(null,user);
    });

    passport.deserializeUser(function(obj,done){
        done(null,obj);
    });

    passport.use(new localStrategy({
        passReqToCallback : true
    },function(req, correo, password, done){
        mongo.connect(url,function(err,db){
            if(err) throw err;
            var collection = db.collection('condominios');
            collection.find({correo : correo}).toArray(function(err,user){
                if(err) throw err;
                if(password === user[0].password){
                    db.close();
                    return done(null,user);
                }
                return done(null,false, req.flash('autenticacion','Correo o Password incorrectos'));
            }); 
        });
    }
    ));

};
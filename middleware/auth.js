module.exports = {

    isLoggedUser: function(req, res, netx){
        if(req.isAuthenticated()){
            netx();
        }
        else{
            res.redirect('/user/signin')
        }
    }
}
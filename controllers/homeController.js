module.exports = {
    index : function(req,res,next){
        res.render('index',{
         isAuthenticated : req.isAuthenticated(),
         user : req.user,
         title : 'SIADCON'});
        console.log(`> Sirviendo Index`); 
    }
}
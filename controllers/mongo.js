const url = 'mongodb://alexitouuu:12345@ds125262.mlab.com:25262/siadcon';
const mongo = require('mongodb').MongoClient;

module.exports ={
      update: function(req, coll){
        var op = req.body;
        var total = 0;
        for (var key in op){
            if(Object.prototype.hasOwnProperty.call(op,key)){
                if (key.toString().includes("dep",0) || key.toString().includes("_id",0)) {                 
                }else{
                    total += parseInt(op[key]);
                    op[key] = parseInt(op[key]);
                    op.total = total;
                }
            }
        };
        console.log(op);
            mongo.connect(url,function(err,db){
            var collection = db.collection(coll);
            collection.update({_id : op.dep}, {$set: {pagos: op}}, {},function(err, object){
                    if (err)
                        console.warn(err.message);
                });
            });
      }

}
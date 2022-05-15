const mongoose = require('mongoose');

const Serv_schema = new mongoose.Schema({
    fid : {
        type : String, 
       
    },
    servicecategories : {
        type : String, 
        require : true
    }, 
    description : {
        type : String, 
        require : true
    },
    date : {
        type : Date,
        default : Date.now()
    }
});

module.exports = Serv_mst = mongoose.model('Serv_mst',Serv_schema);
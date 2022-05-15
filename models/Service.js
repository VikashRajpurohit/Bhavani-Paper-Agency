const mongoose = require ('mongoose');

const Service_schema = new mongoose.Schema({
    stid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Serv_type',
    },
    img:
    {
       type: String
    },
    sname: {
        type: String,
        require: true
    },
    sdescription: {
        type: String,
        requere: true
    },
    date : {
        type : Date,
        default : Date.now 
    }
}) 

module.exports = Service = mongoose.model('service',Service_schema); 
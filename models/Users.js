const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fname : {
        type: String,
        required: true  
    },
    lname : {
        type: String,
        required: true  
    },
    contact : {
        type : String,
        required: true
    },
    username : {
        type : String,
        required : true
    },
    d_o_b : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default : Date.now 
    }

});

module.exports = User = mongoose.model('user',UserSchema);


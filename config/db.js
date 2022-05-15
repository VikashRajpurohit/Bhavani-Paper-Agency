const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoUrl');

const connectDB = async () => {
    try {
        await mongoose.connect(db,{ 
            useNewUrlParser: true,useUnifiedTopology: true,family: 4});
        console.log("MongoDB connected.......");
    } catch (error) {
        console.log(error);
        process.exit(1);        
    }
}

module.exports = connectDB;


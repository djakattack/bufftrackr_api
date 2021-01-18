// REQUIREMENTS
const mongoose = require('mongoose');
const gradient = require('gradient-string');

// VARIABLE DECLARATION
const db = process.env.MONGO_URI;

// ACTION
const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log(gradient.morning(`MongoDB Connected ...`));
    }catch(err){
        console.error(gradient.mind(err.message));
        process.exit(1);
    }
}

module.exports = connectDB;
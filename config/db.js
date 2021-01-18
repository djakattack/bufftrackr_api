// REQUIREMENTS
const mongoose = require('mongoose');
const gradient = require('gradient-string');

// VARIABLE DECLARATION
const db = process.env.MONGO_URI;

// ACTION
const connectDB = async () => {
    // In most cases when async/await is used, it needs to be placed within a try/catch block as such.
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
        process.exit(1); //Escape process with failure.
    }
}

module.exports = connectDB;
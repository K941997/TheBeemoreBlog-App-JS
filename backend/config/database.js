const mongoose = require('mongoose');

const connectDB = async() => {
    const mongoDB = await mongoose.connect(
        process.env.MONGODB_CLOUD_URL,
        {
            useNewUrlParser: true,  
            useUnifiedTopology: true
        }) 
        .then(console.log("Connected to Cloud MongoDB"))
        .catch((err) => console.log(err));
} 

   

module.exports = connectDB
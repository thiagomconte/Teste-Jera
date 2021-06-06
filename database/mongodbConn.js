const mongoose = require("mongoose");

let url = process.env.MONGO_URI;

if(process.env.NODE_ENV === 'production'){
  url = process.env.MONGO_URL
}

mongoose.connect(url, {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() =>{
  console.log("Database connection stablished");
}).catch(err =>{
  console.log("Could not connect to database: " + err);
})

module.exports = mongoose;
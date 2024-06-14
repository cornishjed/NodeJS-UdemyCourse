const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect("mongodb+srv://judgejed:wua5l0ZGuuxYI5vE@cluster0.tkdrccs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then((result) => {
      console.log("Connected!");
      callback(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;

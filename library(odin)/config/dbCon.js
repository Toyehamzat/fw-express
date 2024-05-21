// Set up mongoose connection
const mongoose = require("mongoose");

const mongoDB =
  "mongodb+srv://tazmaheyot:IToST3R8fs8lqEiW@cluster0.bymjqjo.mongodb.net/localLibraryDB?retryWrites=true&w=majority&appName=Cluster0";
const ConnectDb = async () => {
  try {
    await mongoose.connect(mongoDB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = ConnectDb;

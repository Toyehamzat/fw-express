const mongoose = require("mongoose");

const mongoDB =
  process.env.MONGODB_URI ||
  "mongodb+srv://anibiseun:6kn9uNOCzFPdHaac@cluster0.yftm9oz.mongodb.net/LocalLibrary?retryWrites=true&w=majority&appName=Cluster0";

const ConnectDb = async () => {
  try {
    await mongoose.connect(mongoDB, {
      //   useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = ConnectDb;

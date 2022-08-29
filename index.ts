import mongoose from 'mongoose';
import { MongoError } from 'mongodb';

// import environmental variables from our variables.env file
require("dotenv").config({ path: "variables.env" });
(()=>{
// Connect to our Database and handle any bad connections
mongoose.connect(process.env.DATABASE as string);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (error : MongoError) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${error.message}`);
});

// READY?! Let's go!

//Import our models

// Start our app!
const app = require("./app.ts");
app.set("port", process.env.PORT || 7777)
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
})()
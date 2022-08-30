import { connect } from "mongoose";
import {Role} from "./models/Role";
import {Error} from "mongoose";

// import environmental variables from our variables.env file
require("dotenv").config({ path: "variables.env" });
(() => {
  // Connect to our Database and handle any bad connections
  async function run() {
    await connect(process.env.DATABASE as string).then(() => {
      console.log("connected")
      initial()
      }
    );
  }

  run().catch((err) => {
    console.log(err);
  });

  // READY?! Let's go!

  //Import our models

  // Start our app!
  const { app } = require("./app.ts");
  app.set("port", process.env.PORT || 7777);

 const initial = ()=> {Role.estimatedDocumentCount((err: Error, count: number) => {
  if (!err && count === 0) {
    new Role({
      name: "user"
    }).save(err => {
      if (err) {
        console.log("error", err);
      }

      console.log("added 'user' to roles collection");
    });

    new Role({
      name: "moderator"
    }).save(err => {
      if (err) {
        console.log("error", err);
      }

      console.log("added 'moderator' to roles collection");
    });

    new Role({
      name: "admin"
    }).save(err => {
      if (err) {
        console.log("error", err);
      }

      console.log("added 'admin' to roles collection");
    });
  }
});}


  const server = app.listen(app.get("port"), () => {
    console.log(`Express running → PORT ${server.address().port}`);
  });
})();

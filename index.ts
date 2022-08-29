import {Schema, model, connect} from 'mongoose';

// import environmental variables from our variables.env file
require("dotenv").config({ path: "variables.env" });
(()=>{

  interface IUser {
    name: string;
    email: string;
    avatar?: string;
  }
  
  const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String
  });
// Connect to our Database and handle any bad connections

const User = model<IUser>('User', userSchema);

async function run(){await connect(process.env.DATABASE as string);
  const user = new User({
    name: 'Bill',
    email: 'bill@initech.com',
    avatar: 'https://i.imgur.com/dM7Thhn.png'
  });
  await user.save();

  console.log(user.email);
}

 
run().catch((err) => {console.log(err)})

// READY?! Let's go!

//Import our models

// Start our app!
const {app} = require("./app.ts");
app.set("port", process.env.PORT || 7777)
const server = app.listen(app.get("port"), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
})()
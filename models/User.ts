import {Schema, model} from "mongoose"

interface IUser {
  username: string;
  email: string;
  password: string;
  roles: [{type: Schema.Types.ObjectId, ref: "Role"}]
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: {type: String, required: true},
  roles: [{type: Schema.Types.ObjectId, ref: "Role"}]
});


const User = model<IUser>("User", userSchema);
export {User} 

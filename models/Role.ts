import {Schema, model} from "mongoose"

interface IRole {
  name: string;
}

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true },
});


const Role = model<IRole>("Role", roleSchema);
export {Role}
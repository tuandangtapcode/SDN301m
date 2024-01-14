import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const Roles = new Schema({
  roleID: { type: Number },
  roleName: { type: String },
})

const RolesModel = mongoose.model('Roles', Roles);

export default RolesModel;


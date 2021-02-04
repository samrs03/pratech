const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const adminsSchema = new mongoose.Schema({
  admin_name: {
    required: true,
    type: String,
    unique: true,
  },
  admin_password: { required: true, type: String },
  admin_email: { required: true, type: String, unique: true },
});
const admins = mongoose.model("admins", adminsSchema);
const usersSchema = new mongoose.Schema({
  _id: Number,
  user_name: {
    required: true,
    type: String,
  },
  user_gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Non-binary"],
  },
  user_job_status: {
    type: String,
    required: true,
    enum: ["Employed", "Unemployed"],
  },
  user_birth_date: {
    type: Date,
    required: true,
  },
  user_country: {
    required: true,
    type: String,
    enum: ["USA", "Colombia"],
  },
},);
usersSchema.plugin(autoIncrement);
const users = mongoose.model("users", usersSchema);
module.exports = { users, admins };

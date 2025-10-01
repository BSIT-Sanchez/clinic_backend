import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true }, // 📱 added phone
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema);
export default User;

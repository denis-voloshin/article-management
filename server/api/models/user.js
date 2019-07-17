import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  login: { type: String, required: true, unique: true, match: /^[0-9a-zA-Z]+$/ },
  password: { type: String, required: true , select: false },
  token: { type: String, select: false }
});

export const UserModel = mongoose.model('User', userSchema);

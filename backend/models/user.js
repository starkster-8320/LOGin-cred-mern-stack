const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  gender: String,
  hobbies: [String],
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['employee', 'manager'] },
  departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
});

module.exports = mongoose.model('user', userSchema);

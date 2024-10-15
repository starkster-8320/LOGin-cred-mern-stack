const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentName: String,
  categoryName: String,
  location: String,
  salary: Number,
  employeeIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('department', departmentSchema);

const express = require('express');
const Department = require('../models/department');
const User = require('../models/user');

const router = express.Router();

// CRUD operations for departments

// Create Department
router.post('/', async (req, res) => {
  const department = new Department(req.body);
  await department.save();
  res.status(201).json(department);
});

// Get Departments with Pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const departments = await Department.find()
    .skip((page - 1) * limit)
    .limit(limit);
  const count = await Department.countDocuments();
  
  res.json({ departments, totalPages: Math.ceil(count / limit) });
});

// Update Department
router.put('/:id', async (req, res) => {
  const department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(department);
});

// Delete Department
router.delete('/:id', async (req, res) => {
  await Department.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

// Assign Employees to Department
router.put('/:id/assign', async (req, res) => {
  const { employeeIds } = req.body;
  const department = await Department.findById(req.params.id);
  department.employeeIds.push(...employeeIds);
  await department.save();
  res.json(department);
});

module.exports = router;

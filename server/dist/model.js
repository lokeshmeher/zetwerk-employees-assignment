"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Employee = void 0;

const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  salary: {
    type: mongoose.Decimal128,
    required: true
  },
  skills: {
    type: [String],
    required: true
  },
  profileImage: {
    type: String,
    required: true
  }
});
employeeSchema.set('collection', 'employees');
employeeSchema.index({
  name: 'text'
});
const Employee = new mongoose.model('Employee', employeeSchema);
exports.Employee = Employee;
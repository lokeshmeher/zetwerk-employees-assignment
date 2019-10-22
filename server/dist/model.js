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
    type: mongoose.Types.Decimal128,
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
}, {
  // Options
  collection: 'employees',
  toJSON: {
    versionKey: false,
    // exclude version key (__v) from output
    transform: (doc, ret, options) => {
      delete ret._id;
      ret.id = doc._id;
      ret.salary = parseFloat(ret.salary);
      return ret;
    }
  }
});
employeeSchema.set('collection', 'employees');
employeeSchema.index({
  name: 'text'
});
const Employee = new mongoose.model('Employee', employeeSchema);
exports.Employee = Employee;
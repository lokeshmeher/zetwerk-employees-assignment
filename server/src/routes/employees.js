import express from 'express'
import { Employee } from '../model'
import { DateTime } from 'luxon'

export const employeesRouter = express.Router()

// List / search employees
employeesRouter.get('/', async (req, res) => {
  const { q, skip, limit } = req.query
  const filter = {}
  let projection = null
  const options = {}

  // Search 'name'
  try {
    if (q) {
    filter.$text = { $search: q }
    projection = { score: { $meta: "textScore" } }
    options.sort = { score: { $meta: "textScore" } }
    }
    if (skip) options.skip = parseInt(skip)
    if (limit) options.limit = parseInt(limit)
  } catch (err) {
    return res.status(400).send('Invalid query parameters')
  }

  const employees = await Employee.find(filter, projection, options)
  return res.json(employees)
})

// create employee
employeesRouter.post('/', async (req, res) => {
  let { name, dob, salary, skills, profileImage } = req.body
  try {
    if (dob) dob = DateTime.fromISO(dob).toJSDate()
    const employee = new Employee({ name, dob, salary, skills, profileImage })
    await employee.save()
    return res.status(201).json(employee)
  } catch (err) {
    return res.status(400).send('Invalid request body')
  }
})

// get employee
employeesRouter.get('/:employeeId', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId)
    return res.json(employee)
  } catch (err) {
    return res.status(404).send(`No employee found for id '${req.params.employeeId}'`)
  }
})

// update employee
employeesRouter.put('/:employeeId', async (req, res, next) => {
  let { name, dob, salary, skills, profileImage } = req.body
  if (dob) dob = DateTime.fromISO(dob).toJSDate()
  try {
    const employee = await Employee.findOneAndUpdate(
      { _id: req.params.employeeId },
      { name, dob, salary, skills, profileImage },
      {
        omitUndefined: true,  // If a field is undefined, don't replace it
        new: true
      }
    )
    return res.json(employee)
  } catch (err) {
    return res.status(400).send('Invalid request body')
  }
})

// delete employee
employeesRouter.delete('/:employeeId', async (req, res, next) => {
  try {
    const res = await Employee.deleteOne({ _id: req.params.employeeId })
    return res.send(`Deleted employee with id '${req.params.employeeId}'`)
  } catch (err) {
    return res.status(400).send(`No employee found for id '${req.params.employeeId}'`)
  }
})

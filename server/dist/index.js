"use strict";

require("dotenv/config");

var _mongoose = _interopRequireDefault(require("mongoose"));

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _employees = require("./routes/employees");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mongoUrl = `mongodb+srv://primary:${process.env.MONGO_PASSWORD}@production-sp8hx.mongodb.net/db1?retryWrites=true&w=majority`;

_mongoose.default.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

var app = (0, _express.default)();
app.use(_express.default.json()); // Default error handler

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Sorry, something went wrong!');
}); // Routes

app.use('/employees', _employees.employeesRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
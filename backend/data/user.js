const bcrypt = require("bcryptjs");

const user = [
  {
    name: "Admin",
    email: "admin@example.com",
    password: bcrypt.hashSync("kickflip360", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: bcrypt.hashSync("12345", 10),
  },
  {
    name: "Jane Doe",
    email: "jane@example.com",
    password: bcrypt.hashSync("12345", 10),
  },
];

module.exports = user;

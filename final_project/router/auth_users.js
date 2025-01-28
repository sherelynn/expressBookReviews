const express = require("express")
const jwt = require("jsonwebtoken")
let books = require("./books_db.js")
const reg_users = express.Router()

let users = []

const isValid = username => {
  // Check if username is valid; returns boolean
  return users.some(user => user.username === username)
}

const authenticatedUser = (username, password) => {
  // returns boolean
  // write code to check if username and password match the one we have in records.
}

//only registered users can login
reg_users.post("/login", (req, res) => {
  // write your code here
  return res.status(300).json({ message: "Yet to be implemented" })
})

// Add a book review
reg_users.put("/auth/review/:isbn", (req, res) => {
  // write your code here
  return res.status(300).json({ message: "Yet to be implemented" })
})

module.exports.authenticated = reg_users
module.exports.isValid = isValid
module.exports.users = users

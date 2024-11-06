const express = require("express")
let books = require("./books_db.js")
let isValid = require("./auth_users.js").isValid
let users = require("./auth_users.js").users
const public_users = express.Router()

public_users.post("/register", (req, res) => {
  // write your code here
  return res.status(300).json({ message: "Yet to be implemented" })
})

// Get the book list available in the shop
public_users.get("/", function (req, res) {
  // write your code here
  return res.status(300).json({ message: "Yet to be implemented" })
})

// Get book details based on ISBN
public_users.get("/isbn/:isbn", function (req, res) {
  // write your code here
  return res.status(300).json({ message: "Yet to be implemented" })
})

// Get book details based on author
public_users.get("/author/:author", function (req, res) {
  // write your code here
  return res.status(300).json({ message: "Yet to be implemented" })
})

// Get all books based on title
public_users.get("/title/:title", function (req, res) {
  // write your code here
  return res.status(300).json({ message: "Yet to be implemented" })
})

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  // write your code here
  return res.status(300).json({ message: "Yet to be implemented" })
})

module.exports.general = public_users

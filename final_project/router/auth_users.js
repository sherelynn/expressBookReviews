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
  // Check if username and password match the records; returns boolean
  return users.some(
    user => user.username === username && user.password === password
  )
}

// Only registered users can login
reg_users.post("/login", (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." })
  }

  // Authenticate the user
  if (authenticatedUser(username, password)) {
    // Generate a JWT token
    const token = jwt.sign({ username }, "access", { expiresIn: "1h" })

    // Save the token in the session
    if (!req.session.authorization) {
      req.session.authorization = {}
    }

    req.session.authorization = { username, accessToken: token }

    return res
      .status(200)
      .json({ message: "User successfully logged in.", token })
  } else {
    return res.status(401).json({ message: "Invalid username or password." })
  }
})

// Add a book review
reg_users.put("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params
  const { review } = req.query
  const username = req.user?.username

  // Validate the input
  if (!isbn || !review) {
    return res
      .status(400)
      .json({ message: "ISBN and review text are required." })
  }

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found." })
  }

  if (!books[isbn].reviews) {
    books[isbn].reviews = {}
  }

  books[isbn].reviews[username] = review

  res.status(200).json({
    message: "Review added/updated successfully.",
    reviews: books[isbn].reviews,
  })
})

// Delete a book review
reg_users.delete("/auth/review/:isbn", (req, res) => {
  const { isbn } = req.params
  const username = req.user?.username

  if (!books[isbn]) {
    return res.status(404).json({ message: "Book not found." })
  }

  if (!books[isbn].reviews || !books[isbn].reviews[username]) {
    return res
      .status(404)
      .json({ message: "Review not found under your username. " })
  }

  // Delete the review
  delete books[isbn].reviews[username]

  res.status(200).json({
    message: "Review deleted successfully.",
    reviews: books[isbn].reviews,
  })
})

module.exports.authenticated = reg_users
module.exports.isValid = isValid
module.exports.users = users

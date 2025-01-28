const express = require("express")
let books = require("./books_db.js")
let isValid = require("./auth_users.js").isValid
let users = require("./auth_users.js").users
const public_users = express.Router()

const getBooks = async () => {
  return books
}

public_users.post("/register", (req, res) => {
  // write your code here
  return res.status(300).json({ message: "Yet to be implemented" })
})

// Get the book list available in the shop
// Use async/await
public_users.get("/", async (req, res) => {
  try {
    // Fetch books data
    const booksData = await getBooks()

    // Respond with the data
    return res.status(200).json(booksData)
  } catch (error) {
    console.error("Error fetching books: ", error.message)

    // Respond with detailed error information
    return res.status(500).json({
      success: false,
      message: "Failed to fetch books.",
      error: error.message, // Include error details for debugging
    })
  }
})

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async (req, res) => {
  // Retrieve ISBN parameter value from URL path
  const { isbn } = req.params

  try {
    // Fetch books data
    const booksData = await getBooks()

    // Check if the book exists
    const bookByIsbn = booksData[isbn]

    if (bookByIsbn) {
      return res.status(200).json({
        success: true,
        message: "Book found.",
        data: bookByIsbn,
      })
    } else {
      // If the book is not found, return 404 response
      return res.status(404).json({
        success: false,
        message: `No book found with ISBN: ${isbn}`,
      })
    }
  } catch (error) {
    console.error(`Error fetching book details: ${error.message}`)

    // Handle unexpected errors
    return res.status(500).json({
      success: false,
      message: "Error fetching book details",
      error: error.message, // Include error details for debugging
    })
  }
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

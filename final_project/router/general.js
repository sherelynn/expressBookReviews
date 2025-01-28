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
public_users.get("/author/:author", async (req, res) => {
  // Retrieve author from URL path
  const { author } = req.params

  try {
    // Fetch books data
    const booksData = await getBooks()

    // Filter books by matching author (case-insensitive)
    const booksByAuthor = Object.values(booksData).filter(
      book => book.author.toLowerCase() === author.toLowerCase()
    )

    // Check if any books are found
    if (booksByAuthor.length > 0) {
      return res
        .status(200)
        .json({ success: true, message: "Books found", data: booksByAuthor })
    } else {
      return res.status(404).json({
        success: false,
        message: `No books found by author: ${author}`,
      })
    }
  } catch (error) {
    console.error(`Error fetching books: ${error.message}`)

    // Handle unexpected errors
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching books.",
      error: error.message, // Include error details for debugging
    })
  }
})

// Get all books based on title
public_users.get("/title/:title", async (req, res) => {
  // Retrieve title from URL path
  const { title } = req.params

  try {
    const booksData = await getBooks()

    // Filter books by matching title (case insensitive)
    const booksByTitle = Object.values(booksData).filter(
      book => book.title.toLowerCase() == title.toLowerCase()
    )

    // Check if any books are found
    if (booksByTitle.length > 0) {
      return res
        .status(200)
        .json({ success: true, message: "Books found.", data: booksByTitle })
    } else {
      return res.status(404).json({
        success: false,
        message: `No books found by title: ${title}`,
      })
    }
  } catch (error) {
    console.error(`Error fetching books: ${error.message}`)

    // Handle unexpected errors
    return res.status(500).json({
      success: false,
      message: "Error occurred while fetching books.",
      error: error.message, // Include error details for debugging
    })
  }
})

//  Get book review based on ISBN
public_users.get("/review/:isbn", async (req, res) => {
  const { isbn } = req.params // Retrieve ISBN from URL path

  try {
    // Fetch books data
    const booksData = await getBooks()

    // Check if book exists
    const book = booksData[isbn]

    if (book) {
      const reviews = book.reviews

      if (reviews && Object.keys(reviews).length > 0) {
        res
          .status(200)
          .json({ success: true, message: "Reviews found", data: reviews })
      } else {
        res.status(404).json({
          success: false,
          message: `No reviews found for the book with ISBN: ${isbn}`,
        })
      }
    } else {
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
      message: "Error occurred while fetching book reviews.",
      error: error.message, // Include error details for debugging
    })
  }
})

module.exports.general = public_users

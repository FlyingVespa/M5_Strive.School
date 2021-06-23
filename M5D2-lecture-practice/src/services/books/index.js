import express from 'express'
import fs from 'fs'
import {fileURLToPath} from 'url'
import {dirname, join} from 'path'
import uniqid from 'uniqid'

const booksRouter = express.Router()

// const booksJsonPath = join(dirname(fileURLToPath(import.meta.url)), "../../../node_modules/books.json")

const booksJsonPath = join(dirname(fileURLToPath(import.meta.url)), "books.json")

const getbooksArray = () => {
  const content = fs.readFileSync(booksJsonPath)
  return JSON.parse(content)
}

const writebooks = (content) => fs.writeFileSync(booksJsonPath, JSON.stringify(content))

// 1.
booksRouter.get("/", (req, res) => {
  const books = getbooksArray()

  console.log(req.query)
  if(req.query && req.query.title) {
    const filteredBooks = books.filter(book => book.hasOwnProperty("title") && book.title === req.query.title)
    res.send(filteredBooks)
  } else {

    res.send(books)
  }
})

// 2.
booksRouter.get("/:userId", (req, res) => {
  const books = getbooksArray()

  const user = books.find(u => u._id === req.params.userId)

  res.send(user)
})

// 3.
booksRouter.post("/", (req, res) => {
  const newUser = {...req.body, _id: uniqid(), createdAt: new Date()}

  const books = getbooksArray()

  books.push(newUser)

  writebooks(books)
  res.status(201).send({_id: newUser._id})
})

// 4.
booksRouter.put("/:userId", (req, res) => {
  const books = getbooksArray()

  const remainingbooks = books.filter(user => user._id !==req.params.userId)

  const updatedUser = {...req.body, _id: req.params.userId}

  remainingbooks.push(updatedUser)

  writebooks(remainingbooks)

  res.send(updatedUser)
})

// 5.
booksRouter.delete("/:userId", (req, res) => {

  const books = getbooksArray()
  const remainingbooks = books.filter(user => user._id !==req.params.userId)

  writebooks(remainingbooks)

  res.status(204).send()
})

export default booksRouter
© 2021 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const books = require('./data/books.json');
let users = require('./data/users.json');

// Task 1
app.get('/books', (req, res) => {
  res.json(books);
});

// Task 2
app.get('/books/isbn/:isbn', (req, res) => {
  const found = books.find(b => b.isbn === req.params.isbn);
  res.json(found || {});
});

// Task 3
app.get('/books/author/:author', (req, res) => {
  res.json(books.filter(b => b.author.toLowerCase() === req.params.author.toLowerCase()));
});

// Task 4
app.get('/books/title/:title', (req, res) => {
  res.json(books.filter(b => b.title.toLowerCase().includes(req.params.title.toLowerCase())));
});

// Task 5
app.get('/review/:isbn', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  res.json(book ? { review: book.review } : {});
});

// Task 6
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (users.find(u => u.username === username)) {
    return res.status(400).send('User already exists.');
  }
  users.push({ username, password });
  fs.writeFileSync('./data/users.json', JSON.stringify(users, null, 2));
  res.send('User registered successfully.');
});

// Task 7
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  res.json(user ? { success: true } : { success: false });
});

// Task 8
app.put('/review/:isbn', (req, res) => {
  const { username, review } = req.body;
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book) {
    book.review = `${review} - by ${username}`;
    fs.writeFileSync('./data/books.json', JSON.stringify(books, null, 2));
    res.send('Review added.');
  } else {
    res.status(404).send('Book not found.');
  }
});

// Task 9
app.delete('/review/:isbn/:username', (req, res) => {
  const book = books.find(b => b.isbn === req.params.isbn);
  if (book && book.review.includes(req.params.username)) {
    book.review = "";
    fs.writeFileSync('./data/books.json', JSON.stringify(books, null, 2));
    res.send('Review deleted.');
  } else {
    res.status(403).send('Unauthorized or review not found.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

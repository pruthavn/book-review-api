const axios = require('axios');
const baseURL = 'http://localhost:3000';

// Task 10 - Async/Await
async function getAllBooks() {
  const res = await axios.get(`${baseURL}/books`);
  console.log(res.data);
}

// Task 11 - Promises
function searchByISBN(isbn) {
  axios.get(`${baseURL}/books/isbn/${isbn}`)
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
}

// Task 12 - Author (Async)
async function searchByAuthor(author) {
  const res = await axios.get(`${baseURL}/books/author/${author}`);
  console.log(res.data);
}

// Task 13 - Title (Async)
async function searchByTitle(title) {
  const res = await axios.get(`${baseURL}/books/title/${title}`);
  console.log(res.data);
}

// Run for testing
// getAllBooks();
// searchByISBN('1234567890');
// searchByAuthor('John Doe');
// searchByTitle('JavaScript');

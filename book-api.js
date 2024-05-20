const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Where we will keep books
let books = [];

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/books', (req, res) => {
    res.json(books);
});

//Add the route to get a book by ISBN
app.get('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books.find(b => b.isbn === isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

app.post('/book', (req, res) => {
    const book = req.body;

    // Output the book to the console for debugging
    console.log(book);
    books.push(book);
    
    res.send('Book is added to the database');
});

app.post('/book/:isbn', (req, res) => {
    // Reading isbn from the URL
    const isbn = req.params.isbn;
    const newBook = req.body;

    // Remove item from the books array and replace it with the new one
    for (let i = 0; i < books.length; i++) {
        let book = books[i];

        if (book.isbn === isbn) {
            books[i] = newBook;
        }
    }
    
    // Sending 404 when not found something is good practice
    res.send('Book is edited');
});

app.delete('/book/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const bookIndex = books.findIndex(book => book.isbn === isbn);

    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.send("Book is deleted");
    } else {
        res.status(404).send("Book not found from api");
    }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}`));

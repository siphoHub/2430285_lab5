const express = require('express')
const app = express();

//array of books
let books = [
    {
      "id": "1",
      "title": "To Kill a Mockingbird",
      "details": [
        {
          "id": "1",
          "author": "Harper Lee",
          "genre": "Fiction",
          "publicationYear": 1960
        }
      ]
    },
    {
      "id": "2",
      "title": "Misery",
      "details": [
        {
          "id": "1",
          "author": "Stephan King",
          "genre": "Horror",
          "publicationYear": 1987
        },
        {
            "author": "Hugh G Reckshun",
            "genre": "Fantacy",
            "publicationYear": 1942
        }
      ]
    }
  ];

  const myStuNum = {
    studentNum : 2430285
  }

app.use(express.json())

//console.log(books)
//console.log(books.at(1))

// Routes
//sends back student number as JSON when get request sent
app.get('/whoami', (req, res) => {
    res.json(myStuNum); 
  });

//sends back books
app.get('/books', (req, res) => {
    res.json(books);  
  });

//sends back book at id taken
app.get('/books/:id', (req, res) => {
    const id = req.params.id
    //console.log(id.charAt(1))
    const book = books.find(b => b.id === id.charAt(1));

    if (book){
        res.json(book);  
    }else{
        res.sendStatus(404)
    }
  });

//adds a new book
app.post('/books', (req, res) => {
    const new_book = req.body

    if (!new_book.id || !new_book.title || !new_book.details){ //checks if book is valid
        sendStatus(400)
    }else{

    books.push(new_book);
    res.sendStatus(201)

    console.log(new_book)
    console.log(books)
    }
  });

//updates book array (replaces specific book in books with new book)
app.put('/books/:id', (req, res) => {
    const id = req.params.id;
    const updatedBook = req.body;
  
    const originalBook = books.find(b => b.id === id.charAt(1));

    Object.assign(originalBook, updatedBook);
    res.sendStatus(201)
    console.log(books)
  });

//deletes book from array
app.delete('/books/:id', (req, res) => {
    const id = req.params.id;
  
    const bookIndex = books.findIndex(book => book.id === id.charAt(1));

    books.splice(bookIndex);
    res.sendStatus(201)
    console.log(books)
  });

//adds detail to details array found in a book object
app.post('/books/:id/details', (req, res) => {
    const id = req.params.id;
    const updatedDetails = req.body;
  
    const originalBook = books.find(b => b.id === id.charAt(1));

    originalBook.details.push(updatedDetails)
    res.sendStatus(201)
    console.log(books)
    console.log(books.at(books.findIndex(b => b.id === id.charAt(1))))
  });

//removes detail from details array found in a book object
app.delete('/books/:id/details/:detailId', (req, res) => {
    const id = req.params.id;
    const detailId = req.params.detailId;
  
    const originalBook = books.find(b => b.id === id.charAt(1));
    const bookIndex = originalBook.details.findIndex(d => d.detailId === detailId.charAt(1));

    originalBook.details.splice(bookIndex)
    res.sendStatus(201)
    console.log(books)
    console.log(books.at(books.findIndex(b => b.id === id.charAt(1))))
  });

//start sever
app.listen(3000)

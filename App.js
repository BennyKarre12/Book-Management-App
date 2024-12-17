import React, { useEffect, useState } from 'react';
import Home from './components/home';
import SearchResults from './components/search results';
import BookDetails from './components/book details';
import AddEditBook from './components/addeditbook';
import DeleteBook from './components/deletebook';


const App = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8088/books')
            .then((response) => response.json())
            .then((data) => setBooks(data))
            .catch((error) => console.error('Error fetching books:', error));
    }, []);

    const addBook = (newBook) => {
        // POST API logic here
        console.log('Adding book:', newBook);
    };

    const editBook = (updatedBook) => {
        // PUT API logic here
        console.log('Editing book:', updatedBook);
    };

    const deleteBook = (bookId) => {
        // DELETE API logic here
        console.log('Deleting book with ID:', bookId);
    };

    return (
        <div>
            <Home />
            <SearchResults books={books} />
            <BookDetails book={selectedBook} />
            <AddEditBook onSave={selectedBook ? editBook : addBook} existingBook={selectedBook} />
            <DeleteBook onDelete={deleteBook} bookId={selectedBook?.BookID} />
        </div>
    );
};

export default App;

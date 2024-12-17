import React, { useState, useEffect } from 'react';
import AddEditBook from './AddEditBook';
import SearchResults from './SearchResults';

const BookManager = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        fetchBooks(); // Fetch books when the component mounts
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await fetch('/books');
            const data = await response.json();
            setBooks(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleSaveBook = async (book) => {
        try {
            const response = await fetch(
                book.BookID ? `/books/${book.BookID}` : '/books',
                {
                    method: book.BookID ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(book),
                }
            );

            if (response.ok) {
                alert('Book saved successfully!');
                fetchBooks(); // Refresh book list
                setSelectedBook(null); // Clear selected book
            } else {
                alert('Failed to save book. Please try again.');
            }
        } catch (error) {
            console.error('Error saving book:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h1>Book Management</h1>
            <SearchResults books={books} onEdit={(book) => setSelectedBook(book)} />
            <AddEditBook onSave={handleSaveBook} existingBook={selectedBook} />
        </div>
    );
};

export default BookManager;

import React, { useState, useEffect } from 'react';

const AddEditBook = ({ onSave, existingBook }) => {
    const [book, setBook] = useState({
        Title: '',
        AuthorID: '',
        GenreID: '',
        Pages: '',
        PublishedDate: '',
    });

    // Function to format date into YYYY-MM-DD
    const formatDate = (date) => {
        if (!date) return '';
        
        // Check if the date is in DD-MM-YYYY format and convert it
        if (date.includes('-')) {
            const [day, month, year] = date.split('-'); // Split into components
            return `${year}-${month}-${day}`; // Rearrange to YYYY-MM-DD
        }
    
        // Otherwise, parse as a normal Date object
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Ensure two digits
        const day = String(d.getDate()).padStart(2, '0'); // Ensure two digits
        return `${year}-${month}-${day}`;
    };
    

    // Populate fields if editing
    useEffect(() => {
        if (existingBook) {
            setBook({
                ...existingBook,
                PublishedDate: formatDate(existingBook.PublishedDate),
            });
        }
    }, [existingBook]);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({ ...prevBook, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!book.Title || book.Title.length < 3) {
            alert('Title must be at least 3 characters.');
            return;
        }
        if (book.Pages <= 0) {
            alert('Pages must be positive.');
            return;
        }

        try {
            const response = await fetch(
                existingBook ? `http://localhost:8088/books/${existingBook.BookID}` : 'http://localhost:8088/books',
                {
                    method: existingBook ? 'PUT' : 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(book),
                }
            );

            if (!response.ok) throw new Error('Failed to save.');

            const result = await response.json();
            alert(`Book ${existingBook ? 'updated' : 'added'} successfully.`);
            onSave(result);
        } catch (error) {
            alert('An error occurred.');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>{existingBook ? 'Edit Book' : 'Add New Book'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px', maxWidth: '400px' }}>
                <input
                    type="text"
                    name="Title"
                    placeholder="Title"
                    value={book.Title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="AuthorID"
                    placeholder="Author ID"
                    value={book.AuthorID}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="GenreID"
                    placeholder="Genre ID"
                    value={book.GenreID}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="Pages"
                    placeholder="Pages"
                    value={book.Pages}
                    onChange={handleChange}
                    required
                    min="1"
                />
                <input
                    type="date"
                    name="PublishedDate"
                    value={book.PublishedDate}
                    onChange={handleChange}
                    required
                />
                <button type="submit" style={{ background: 'green', color: 'white', padding: '10px' }}>
                    {existingBook ? 'Update' : 'Add'}
                </button>
            </form>
        </div>
    );
};

export default AddEditBook;

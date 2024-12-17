import React from 'react';

const BookDetails = ({ book }) => {
    if (!book) return <p>Select a book to see details.</p>;

    return (
        <div>
            <h2>Book Details</h2>
            <p><strong>Title:</strong> {book.Title}</p>
            <p><strong>Author:</strong> {book.AuthorID}</p>
            <p><strong>Genre:</strong> {book.GenreID}</p>
            <p><strong>Pages:</strong> {book.Pages}</p>
            <p><strong>Published Date:</strong> {book.PublishedDate}</p>
        </div>
    );
};

export default BookDetails;

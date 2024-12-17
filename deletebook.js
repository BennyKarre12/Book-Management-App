import React from 'react';

const DeleteBook = ({ onDelete, bookId }) => {
    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            onDelete(bookId);
        }
    };

    return (
        <button onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white', padding: '5px 10px' }}>
            Delete Book
        </button>
    );
};

export default DeleteBook;

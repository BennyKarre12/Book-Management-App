import React, { useState, useEffect } from 'react';

const SearchResults = ({ books }) => {
    const [query, setQuery] = useState('');
    const [authorFilter, setAuthorFilter] = useState('');
    const [genreFilter, setGenreFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 5;

    const filteredBooks = books.filter((book) =>
        book.Title.toLowerCase().includes(query.toLowerCase()) &&
        (authorFilter === '' || book.AuthorID === authorFilter) &&
        (genreFilter === '' || book.GenreID === genreFilter)
    );

    const displayedBooks = filteredBooks.slice(
        (currentPage - 1) * booksPerPage,
        currentPage * booksPerPage
    );

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

    return (
        <div>
            <h2>Search Books</h2>
            <input
                type="text"
                placeholder="Search by title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <select onChange={(e) => setAuthorFilter(e.target.value)} value={authorFilter}>
                <option value="">All Authors</option>
                {/* Populate dynamically */}
                <option value="1">Author 1</option>
                <option value="2">Author 2</option>
            </select>
            <select onChange={(e) => setGenreFilter(e.target.value)} value={genreFilter}>
                <option value="">All Genres</option>
                {/* Populate dynamically */}
                <option value="1">Genre 1</option>
                <option value="2">Genre 2</option>
            </select>

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Genre</th>
                        <th>Pages</th>
                        <th>Published Date</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedBooks.map((book) => (
                        <tr key={book.BookID}>
                            <td>{book.Title}</td>
                            <td>{book.AuthorID}</td>
                            <td>{book.GenreID}</td>
                            <td>{book.Pages}</td>
                            <td>{book.PublishedDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Previous
                </button>
                <span>{currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default SearchResults;

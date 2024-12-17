import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/add-book">Add Book</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </nav>
            <h1>Welcome to the Book Management System</h1>
            <p>
                Manage your books easily with our system. Use the navigation to explore books, add new ones, or edit existing records.
            </p>
        </div>
    );
};

export default Home;

-- Create the Authors table first
CREATE TABLE Authors (
    AuthorID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) UNIQUE NOT NULL
);

-- Create the Genres table next
CREATE TABLE Genres (
    GenreID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(255) UNIQUE NOT NULL,
    Description TEXT
);

-- Finally, create the Books table
CREATE TABLE Books (
    BookID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255) NOT NULL,
    AuthorID INT,
    GenreID INT,
    Pages INT CHECK (Pages > 0),
    PublishedDate DATE NOT NULL,
    FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID) ON DELETE CASCADE,
    FOREIGN KEY (GenreID) REFERENCES Genres(GenreID) ON DELETE CASCADE
);

-- Insert sample data into the Genres table
INSERT INTO Genres (Name, Description) VALUES
('Fiction', 'Fictional books'),
('Non-Fiction', 'Non-fictional books');

-- Insert sample data into the Authors table
INSERT INTO Authors (Name) VALUES
('J.K. Rowling'),
('George Orwell');

-- Insert sample data into the Books table
INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate) VALUES
('Harry Potter', 1, 1, 500, '1997-06-26'),
('Wings of fire', 2, 2, 180, '1999-01-01');

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchBooks } from "../api";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const getBooks = async () => {
      try {
        const data = await fetchBooks();
        setBooks(data);
      } catch (error) {
        
      }
    };
    getBooks();
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(filter.toLowerCase()) ||
      book.author.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="books-catalog">
      <input
        type="text"
        placeholder="Search books..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul>
        {filteredBooks.map((book) => (
          <li key={book.id}>
            <Link to={`/books/${book.id}`}>
              {book.coverimage && (
                <img
                  src={book.coverimage}
                  alt={`${book.title} cover`}
                  style={{ width: "50px", height: "75px", marginRight: "10px" }}
                />
              )}
              {book.title} by {book.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;

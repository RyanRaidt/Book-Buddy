import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleBook = ({ user, refreshUserBooks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(
          `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch book details. Status: ${response.status}`
          );
        }
        const data = await response.json();
        setBook(data.book);
      } catch (error) {}
    };

    fetchBookDetails();
  }, [id]);

  const handleCheckout = async () => {
    if (!user) {
      alert("You must be logged in to check out a book.");
      return;
    }

    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ isAvailable: false }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();

        throw new Error(`Checkout failed. Status: ${response.status}`);
      }

      alert("Book checked out successfully!");

      if (refreshUserBooks) {
        await refreshUserBooks();
      }

      navigate("/account");
    } catch (error) {
      alert("Failed to check out the book. Please try again.");
    }
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h2>{book.title || "Unknown Title"}</h2>
      <p>Author: {book.author || "Unknown Author"}</p>
      <p>Description: {book.description || "No description available"}</p>
      <p>Status: {book.isAvailable ? "Available" : "Checked Out"}</p>
      <button onClick={handleCheckout}>Check Out</button>
    </div>
  );
};

export default SingleBook;

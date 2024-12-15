import React, { useEffect, useState } from "react";

const Account = ({ user }) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user || !user.token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch reservations.");
        }

        const data = await response.json();

        if (data?.reservation && Array.isArray(data.reservation)) {
          setReservations(data.reservation);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [user]);

  const handleReturnBook = async (reservationId) => {
    if (!user || !user.token) return;

    try {
      const response = await fetch(
        `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${reservationId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`${response.status} - ${errorData.message}`);
      }

      const result = await response.json();

      setReservations((prevReservations) =>
        prevReservations.filter((res) => res.id !== reservationId)
      );

      alert("Book returned successfully!");
    } catch (error) {
      alert("Failed to return the book. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading account details...</div>;
  }

  if (!user) {
    return <div>Please log in to view your account.</div>;
  }

  return (
    <div>
      <h2>{user.email}'s Account</h2>
      <h3>Checked-Out Books</h3>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.id} style={{ marginBottom: "20px" }}>
              <img
                src={reservation.coverimage}
                alt={`${reservation.title} cover`}
                style={{ width: "50px", marginRight: "10px" }}
              />
              <div>
                <strong>{reservation.title}</strong> by {reservation.author}
              </div>
              <button onClick={() => handleReturnBook(reservation.id)}>
                Return Book
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books checked out.</p>
      )}
    </div>
  );
};

export default Account;

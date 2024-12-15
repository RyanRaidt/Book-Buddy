const BASE_URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api";

export const fetchBooks = async () => {
  const response = await fetch(`${BASE_URL}/books`);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  const data = await response.json();
  if (!Array.isArray(data.books)) {
    throw new Error(
      "Invalid data structure received from API. Expected an array under `books`."
    );
  }
  return data.books;
};

export const fetchBookById = async (id) => {
  const response = await fetch(`${BASE_URL}/books/${id}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  const data = await response.json();
  return data.book;
};

export const checkoutBook = async (id, userId) => {
  const response = await fetch(`${BASE_URL}/books/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isAvailable: false, checkedOutBy: userId }),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};

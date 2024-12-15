import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ user, onLogout }) => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "10px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Link to="/books">Books</Link>
      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/account">Account</Link>
          <button
            onClick={onLogout}
            style={{
              background: "none",
              border: "none",
              color: "blue",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
};

export default Navigation;

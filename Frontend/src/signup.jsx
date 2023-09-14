import React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Logo from "./logo";
export default function SignUp() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        console.error("Failed to sign up user:", response.statusText);
      } else {
        response = await response.json();
        if (response.message !== "Account Already Exists") {
          alert("Account Already Exists");
        } else {
          navigate("/reminder");
        }
      }
    } catch (err) {
      console.error("Failed to sign up user:", err);
    }
  };

  const linkStyle2 = {
    textDecoration: "none",
    color: "aliceblue",
    width: "350px",
  };

  const linkStyle = {
    textDecoration: "underlined",
    color: "black",
  };
  return (
    <div className="form-div">
      <Logo />

      <form className="form-signup" onSubmit={handleSubmit}>
        <label htmlFor="name" className="label-signup">
          Enter your Username
        </label>

        <input
          placeholder="Enter Your Name"
          className="user-input-signup"
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <label className="label-signup" htmlFor="email">
          Enter your email
        </label>
        <input
          type="email"
          required
          onChange={handleChange}
          className="user-input-signup"
          placeholder="Enter email ForExapmle@gmail.com"
          id="email"
          name="email"
          value={user.email}
        />
        <label className="label-signup" htmlFor="password">
          Enter Password
        </label>
        <input
          placeholder="Password"
          required
          type="password"
          onChange={handleChange}
          value={user.password}
          name="password"
          id="password"
          className="user-input-signup"
        />
        <Button
          variant="contained"
          className="submit-btn"
          onClick={handleSubmit}
        >
          Sign up
        </Button>
        <footer className="footer-signup">
          <Link style={linkStyle} to="/">
            Already have an account.. Click here to Log In
          </Link>
        </footer>
      </form>
    </div>
  );
}
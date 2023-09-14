import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
export let allow;
import { useNavigate } from "react-router-dom";
import Logo from "./logo";
export default function LogIn() {
  const [profile, setProfile] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      response = await response.json();
      // console.log(response.username);
      const data = { id: response.id, username: response.username };
      const jsonData = JSON.stringify(data);
      localStorage.setItem("myData", jsonData);
      // console.log(jsonData);
      if (response.message === "Access Allowed") {
        navigate("/reminder");
      } else {
        alert("Please fill in correct credentials");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const linkStyle = {
    textDecoration: "underlined",
    color: "black",
  };
  const linkStyle2 = {
    textDecoration: "none",
    color: "aliceblue",
    width: "350px",
  };
  return (
    <>
      <div className="form-div">
        <Logo />
        <form className="form-login">
          <label className="label" htmlFor="email">
            Enter your email
          </label>

          <input
            type="email"
            onChange={handleChange}
            className="user-input"
            placeholder="Enter email ForExapmle@gmail.com"
            id="email"
            name="email"
            value={profile.email}
            required
          />
          <label className="label" htmlFor="password">
            Enter Password
          </label>
          <input
            placeholder="Password"
            type="password"
            onChange={handleChange}
            value={profile.password}
            name="password"
            id="password"
            className="user-input"
            required
          />

          <Button
            variant="contained"
            className="submit-btn"
            onClick={handleSubmit}
          >
            Log In
          </Button>

          <br />
          <br />
          <footer className="footer">
            <Link style={linkStyle} to="/signup">
              Don't have an Account? Click here to Sign-up"{" "}
            </Link>
          </footer>
        </form>
      </div>
    </>
  );
}

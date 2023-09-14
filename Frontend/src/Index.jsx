import React from "react";
import SignUp from "./signup";
import LogIn from "./login";
import App from "./App";
import { BrowserRouter, Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import ReminderApp from "./Reminder";
import { allow } from "./login";

export default function Index() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reminder" element={<ReminderApp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

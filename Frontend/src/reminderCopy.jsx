import { useState } from "react";
import React from "react";
import "./styles2.css";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { Icon } from "@mui/material";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function ReminderApp() {
  const [active, setActive] = useState(false);
  const [newName, setNewName] = useState("");
  const [newReminder, setNewReminder] = useState("");
  const [reminder, setReminder] = useState({ title: "", date_time: "" });

  const handleSubmit = async function (e) {
    e.preventDefault();
    console.log(reminders);
    if (newName === "" && newReminder === "") {
      setReminder((prevReminders) => {
        return [...prevReminders];
      });
    } else {
      setReminder((prevReminders) => {
        return {
          name: newName,
          time_date: newReminder,
          reminderSet: false,
        };
      });
    }
    let response = await fetch("/reminders", {
      method: "PUT",
      body: JSON.stringify(reminder),
      headers: {
        "Content-type": "application/json",
      },
    });
  };
  const handleDelete = (e) => {
    const deleteItemId = e.target.id;
    setReminders(() =>
      reminders.filter((todo) => {
        return deleteItemId != todo.id;
      })
    );
  };

  const toggleSet = (id) => {
    setReminders((prevReminders) =>
      prevReminders.map((todo) =>
        todo.id === id ? { ...todo, reminderSet: !todo.reminderSet } : todo
      )
    );
  };

  const buttonStyle = {
    alignSelf: "flex-end",
    width: "fit-content",
  };

  const iconDelete = {
    width: "fit-content",
    padding: "30px",
    position: "relative",
    left: "650px",
    bottom: "100px",
  };
  const toggleAdd = () => {
    if (active === true) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const fabStyle = {
    alignSelf: "flex-end",
    margin: "20px",
  };

  const boxStyle = {
    width: "784px",
  };

  return (
    <>
      <div className="container">
        <h1 className="header">Task Manager</h1>
        {active ? (
          <Fab
            style={fabStyle}
            color="error"
            onClick={toggleAdd}
            aria-label="remove"
          >
            <RemoveIcon />
          </Fab>
        ) : (
          <Fab
            style={fabStyle}
            color="primary"
            onClick={toggleAdd}
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        )}

        {active && (
          <div className="Form">
            <div className="name-entry">
              <label className="label2" htmlFor="name">
                Enter Title:
              </label>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "25ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  placeholder="Enter title"
                  style={boxStyle}
                  onChange={(e) => {
                    setNewName(e.target.value);
                  }}
                  id="name"
                  name="name"
                  label="Filled"
                  variant="filled"
                />
              </Box>
              {/* <input
                placeholder="Enter title"
                type="text"
                id="name"
                name="name"
                className="user-input-reminder"
                onChange={(e) => {
                  setNewName(e.target.value);
                }}
              /> */}
            </div>
            <div className="reminder-type">
              <label className="label2" htmlFor="time-date">
                Enter Time and Date:
              </label>
              <input
                type="datetime-local"
                id="time-date"
                name="time-date"
                className="user-input-reminder"
                onChange={(e) => {
                  setNewReminder(e.target.value);
                }}
              />
              <Button
                variant="contained"
                className="submit"
                type="submit"
                onClick={handleSubmit}
              >
                Enter
              </Button>
            </div>
          </div>
        )}

        <div className="reminder-list">
          {reminder.map((todo) => {
            return (
              <div
                className={`reminder-item${
                  todo.reminderSet ? " true" : "reminder-item-active"
                }`}
                onClick={() => toggleSet(todo.id)}
                key={todo.id}
              >
                <div className="title-of-reminder">
                  <strong>{todo.name}</strong>
                </div>
                <div className="reminder-date-and-time">
                  <strong>{todo.time_date}</strong>
                </div>
                <IconButton
                  style={iconDelete}
                  aria-label="delete"
                  id={todo.id}
                  onClick={handleDelete}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ReminderApp;

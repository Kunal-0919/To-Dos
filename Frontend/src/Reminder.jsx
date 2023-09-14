import { useEffect, useState } from "react";
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
import Logo from "./logo";
import LogoImage from "./todo_notes_logo.png";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const storedData = localStorage.getItem("myData");
const parsedData = JSON.parse(storedData);
const { username } = parsedData;

function ReminderApp() {
  const [active, setActive] = useState(false);
  const [allReminders, setAllReminders] = useState([]);
  const [state, setState] = useState(0);
  const [reminder, setReminder] = useState({
    id: "",
    title: "",
    time: "",
    isActive: true,
  });
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const firstPage = 1;

  useEffect(() => {
    console.log("called");
    const fetchData = async () => {
      const url = `http://localhost:3000/reminder/items?username=${username}&page=${page}`;
      try {
        let res = await fetch(url);
        res = await res.json();
        console.log(res);
        setLastPage(res.len);
        setAllReminders((prev) => {
          return [...res.data];
        });
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [page, state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReminder((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    const id = e.target.id;
    const reqbody = { username: username, id: id };
    // setAllReminders(() => {
    //   return allReminders.filter((item) => {
    //     return id !== item.id;
    //   });
    // });
    setState((prev) => prev + 1);
    try {
      let res = await fetch("http://localhost:3000/reminder/delete", {
        method: "PUT",
        body: JSON.stringify(reqbody),
        headers: { "Content-Type": "application/json" },
      });
      res = await res.json();
      console.log(res);
    } catch (e) {
      console.log(e.message);
    }
  };

  const toggleSet = async (id) => {
    setAllReminders((prevReminders) =>
      prevReminders.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
    try {
      const storedData = localStorage.getItem("myData");
      const parsedData = JSON.parse(storedData);
      const { username } = parsedData;
      console.log(parsedData);
      const reqbody = {
        id: id,
        username: username,
      };
      let res = await fetch("http://localhost:3000/reminder/toggle", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqbody),
      });
      res = await res.json();
      console.log(res);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPage(lastPage);
    setPage(lastPage);
    const storedData = localStorage.getItem("myData");
    const parsedData = JSON.parse(storedData);
    const { username } = parsedData;
    const newReminder = {
      id: crypto.randomUUID(),
      title: reminder.title,
      time: reminder.time,
      isActive: reminder.isActive,
    };

    if (newReminder.title === "" || newReminder.time === "") {
      return;
    }
    if (allReminders.length < 5) {
      setAllReminders((prev) => {
        return [newReminder, ...prev];
      });
    } else {
      setLastPage((prev) => prev + 1);
      setPage((prev) => prev + 1);
    }
    try {
      let res = await fetch("http://localhost:3000/reminder", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          id: newReminder.id,
          title: newReminder.title,
          time: newReminder.time,
          isActive: newReminder.isActive,
        }),
      });
      res = await res.json();
    } catch (e) {
      console.log(e.message);
      setAllReminders((prev) => {
        return [];
      });
    }
    setReminder({
      id: "",
      title: "",
      time: "",
      isActive: reminderActive,
    });
  };

  const toggleAdd = () => {
    setActive((prev) => !prev);
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

  const fabStyle = {
    alignSelf: "flex-end",
    margin: "20px",
  };

  const boxStyle = {
    width: "788px",
    border: "1px solid black",
  };

  return (
    <>
      <div className="container">
        <img src={LogoImage} className="logo2" />

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
        <div className="button-togglePage">
          {/* <span>
            <button className="paging">{"<"}</button>
          </span>
          <span>
            <button className="paging">{">"}</button>
          </span> */}
        </div>
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
                  style={boxStyle}
                  value={reminder.title}
                  onChange={handleChange}
                  id="title"
                  name="title"
                  variant="outlined"
                />
              </Box>
            </div>
            <div className="reminder-type">
              <label className="label2" htmlFor="time-date">
                Enter Time and Date:
              </label>

              <input
                type="datetime-local"
                id="time"
                name="time"
                className="user-input-reminder"
                value={reminder.time}
                onChange={handleChange}
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
          {allReminders.length !== 0 && (
            <div className="buttonssss">
              <Stack direction="row" spacing={2}>
                <button
                  disabled={page === firstPage}
                  className="paging"
                  onClick={() => {
                    setPage((prev) => prev - 1);
                  }}
                >
                  {"<"}
                </button>

                <div className="btw-btn">
                  Page {page} of {lastPage}
                </div>

                <button
                  disabled={page === lastPage}
                  className="paging"
                  onClick={() => {
                    setPage((prev) => prev + 1);
                  }}
                >
                  {">"}
                </button>
              </Stack>
            </div>
          )}
          {allReminders.map((todo, index) => {
            return (
              <div
                className={
                  todo.isActive ? "reminder-item-active" : "reminder-item"
                }
                id={todo.id}
                onClick={() => toggleSet(todo.id)}
                key={todo.id}
              >
                <div className="title-of-reminder">
                  <strong>{todo.title}</strong>
                </div>
                <div className="reminder-date-and-time">
                  <strong>{todo.time}</strong>
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

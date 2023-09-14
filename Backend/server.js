const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const user = require("./models/users");
const reminder = require("./models/collections");
const cors = require("cors");
const querystring = require("querystring");
const app = express();
const port = 3000;

let Namefield;
let _idField;

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
app.get("/", (req, res) => {
  res.send("Server is live");
});
const url = "mongodb://localhost/myApp";

app.use(cors());
app.use(express.json());

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((err) => {
    console.log("Failed to connect: ", err);
  });

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const check = await user.find({ email: email });
    if (check.length === 0) {
      const profile = new user({
        name: name,
        email: email,
        password: password,
      });

      profile
        .save()
        .then(() => {
          console.log("user saved");
        })
        .catch((err) => {
          console.log("Failed to save user: ", err);
        })
        .then(() => {});
    } else {
      res.json({ message: "Account already exists" });
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const profile = await user.find(
    { email: email, password: password },
    { password: 0, __v: 0, created_At: 0, email: 0 }
  );

  if (profile.length === 0) {
    res.json({ message: "Incorrect Information" });
  } else {
    res.json({
      message: "Access Allowed",
      username: profile[0].name,
      id: profile[0]._id,
    });
    Namefield = profile[0].name;
    _idField = profile[0]._id;
  }
  // console.log(Namefield);
  console.log(_idField);
});

// console.log(username, _id);
// console.log(title);
// console.log(time);
// console.log(isActive);
// console.log(Namefield);
// const update = await reminder.updateOne(
//   { username: username },
//   {
//     $push: {
//       reminder: { id: id, title: title, time: time, isActive: isActive },
//     },
//   }
// );
// // console.log(update);

app.put("/reminder", async (req, res) => {
  const { username, id, title, time, isActive } = req.body;
  try {
    const newDoc = await new reminder({
      username: username,
      id: id,
      title: title,
      time: time,
      isActive: isActive,
    });
    newDoc.save().then(() => {
      console.log("Document saved Successfully");
    });
  } catch (e) {
    console.log(e.message);
  }
});

app.put("/reminder/delete", async (req, res) => {
  const { id, username } = req.body;
  try {
    const deleteItem = await reminder.deleteOne({ id: id });
    console.log(deleteItem);
  } catch (e) {
    console.log(e.message);
  }
});

app.get("/reminder/items", async (req, res) => {
  // console.log(called);
  const { username, page } = req.query;
  const skip = page * 5 - 5;
  try {
    const data = await reminder.aggregate([
      { $match: { username: username } },
      { $sort: { created_At: 1 } },
      { $skip: skip },
      { $limit: 5 },
    ]);
    let len = await reminder.find({ username: username });
    len = Math.ceil(len.length / 5);
    // console.log(len);
    // res.json(data);
    res.json({ data: data, len: len });
  } catch (e) {
    console.log(e.message);
  }
});

app.put("/reminder/toggle", async (req, res) => {
  const { username, id } = req.body;
  const item = await reminder.find({ username: username, id: id });
  console.log(item);
  const status = item[0].isActive;
  console.log(status);
  const updateToggle = await reminder.updateOne(
    ({ username: username, id: id }, { $set: { isActive: !status } })
  );
  console.log(updateToggle);
});

const express = require("express");
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const user = require("./models/users");
const reminder = require("./models/collections");
const cors = require("cors");
const app = express();
const port = 3000;

let Namefield = "Minnie";
let _idField = "64aba03ab1d5468e309992cb";

const arrayOfreminders = [
  {
    id: "45a71e8e-f663-4d59-87aa-212412b25e3d14325",
    title: "School",
    time: "2023-07-21T14:37",
    isActive: true,
  },
  {
    id: "75434e55-d1e2-4df6-bb72-56b3dd9f14a3134",
    title: "Shopping",
    time: "2023-07-21T14:37",
    isActive: true,
  },
  {
    id: "266b57cd-393f-42ec-b3b3-86e0a8441f925421",
    title: "Game",
    time: "2023-07-21T14:37",
    isActive: true,
  },
  {
    id: "45a71e8e-f663-4d59-87aa-212412b25e3d6532",
    title: "School",
    time: "2023-07-21T14:37",
    isActive: true,
  },
  {
    id: "75434e55-d1e2-4df6-bb72-56b3dd9f14a54324",
    title: "Shopping",
    time: "2023-07-21T14:37",
    isActive: true,
  },
  {
    id: "266b57cd-393f-42ec-b3b3-86e0a8441f925423",
    title: "Game",
    time: "2023-07-21T14:37",
    isActive: true,
  },
  {
    id: "45a71e8e-f663-4d59-87aa-212412b25e3d43`",
    title: "School",
    time: "2023-07-21T14:37",
    isActive: true,
  },
  {
    id: "75434e55-d1e2-4df6-bb72-56b3dd9f14a310421",
    title: "Shopping",
    time: "2023-07-21T14:37",
    isActive: true,
  },
  {
    id: "266b57cd-393f-42ec-b3b3-86e0a8441f92341",
    title: "Game",
    time: "2023-07-21T14:37",
    isActive: true,
  },
  {
    id: "45a71e8e-f663-4d59-87aa-212412b25e3d531",
    title: "School",
    time: "2023-07-21T14:37",
    isActive: true,
  },
  {
    id: "75434e55-d1e2-4df6-bb72-56b3dd9f14ag533",
    title: "Shopping",
    time: "2023-07-21T14:37",
    isActive: true,
  },
  {
    id: "266b57cd-393f-42ec-b3b3-86e0a8441f92dca",
    title: "Game",
    time: "2023-07-21T14:37",
    isActive: true,
  },
];

async function newDoc(arr, username, title, time, isActive, id) {
  const len = arr.length;
  if (arr[len - 1].reminder.length === 5) {
    const newDoc = await new reminder({
      userid: _idField,
      username: Namefield,
      reminder: { $push: { id, title, time, isActive } },
    });
    newDoc.save();
  } else {
  }
}

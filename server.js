const express = require("express");
const path = require("path");
const notedb = require("./db/db.json");
const app = express();
const util = require("util");
const fs = require("fs");

const uniqid = require("uniqid");
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.get("/api/notes", (req, res) => {

  return res.json(notedb);
});

app.post("/notes", (req, res) => {

  const newNote = req.body;
  newNote.id = uniqid()

  notedb.push(newNote);
  noteString = JSON.stringify(notedb);

  fs.writeFile("./db/notes.json", notedb, (err) => err ? console.error(err) : console.log('Complete'));

  res.json(notedb);
});

app.delete("/api/notes/:id", (req, res) => {
  
  let id = req.params.id;
  console.log(id)
  
  notedb = notedb.filter(note => note.id !== id);
  noteString = JSON.stringify(notedb);
  
  fs.writeFile("./db/notes.json", notedb, (err) => err ? console.error(err) : console.log('Complete'));
  
 return  res.send('Deleted');
})

app.listen(PORT, () => 
  console.log("App listening on PORT ${PORT}"));

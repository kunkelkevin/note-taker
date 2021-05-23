const fs = require("fs");
const path = require("path");

const router = require("express").Router();

let notes = require("../../db/db");

const newNote = (note) => {
  notes.push(note);
  fs.writeFileSync(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(notes, null, 2)
  );
  return note;
};

const deleteNote = (id) => {
  notes = notes.filter((note) => note.id !== id);
  fs.writeFileSync(
    path.join(__dirname, "../../db/db.json"),
    JSON.stringify(notes, null, 2)
  );
  return notes;
};

router.get("/notes", (req, res) => {
  res.json(notes);
});

router.post("/notes", (req, res) => {
  let newId = 0;
  if (notes.length > 0) {
    notes.forEach((note) => (newId = Math.max(newId, note.id)));
    newId++;
  }
  req.body.id = newId.toString();
  const note = newNote(req.body);
  res.json(note);
});

router.delete("/notes/:id", (req, res) => {
  const result = deleteNote(req.params.id);
  res.json(result);
});

module.exports = router;

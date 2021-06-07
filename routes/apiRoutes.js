const router = require("express").Router();
const storer = require("../db/storer");

router.get("/notes", (req, res) => {
    storer
    .readNotes()
    .then((notes) => {
    return res.json(notes);
    })
    .catch((err) => res.json(err));
});

router.post("/notes", (req, res) => {
  storer
    .writeNotes(req.body)
    .then((notes) => {
      return res.json(notes);
    })
    .catch((err) => res.json(err));
});

module.exports = router;

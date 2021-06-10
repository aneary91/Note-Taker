const router = require("express").Router();
const storer = require("../db/storer");

router.get("/notes", (req, res) => {
    storer
    .getNotes()
    .then((notes) => {
    return res.json(notes);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/notes", (req, res) => {
    storer
    .writeNote(req.body)
    .then((notes) => {
    return res.json(notes);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
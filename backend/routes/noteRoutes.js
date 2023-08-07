const express = require("express");
const { getNotes, getNoteById, createNote, deleteNote, updateNote } = require("../controllers/noteController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
    .get(protect, getNotes);

router.route("/:id")
    .get(getNoteById)
    .delete(protect, deleteNote)
    .put(protect, updateNote)

router.route("/create").post(protect, createNote)
module.exports = router
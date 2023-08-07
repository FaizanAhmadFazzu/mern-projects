const Note = require("../models/noteModel");

const asyncHandler = require("express-async-handler");

//  @desc           Get logged in user notes
//  @route          Get /api/notes
//  @access         Private
const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
});

//      @desc            Fetch Single Note
//      @route           Get /api/notes/:id
//      @access          Public

const getNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note) {
        res.json(note);
    } else {
        res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
});

//   @desc                Create Single Note
//   @route               Get /api/notes/create
//   @access              Private
const createNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;


    if (!title || !content || !category) {
        throw new Error("Please Fill all the fields.")
        return;
    } else {
        const note = Note({ user: req.user._id, title, content, category })

        const createdNote = await note.save();
        res.status(201).json(createdNote);
    }
});

//   @desc                Delete Single Note
//   @route               Get  /api/notes/:id
//   @access              Private
const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action.")
    }

    if (note) {
        await Note.findOneAndDelete(req.params.id)
        // await note.remove();
        res.json({ message: "Note Removed" })
    } else {
        res.status(404);
        throw new Error("Note not found.")
    }
});

//    @desc          Update Note
//    @route         PUT /api/notes/:id
//    @access        Private
const updateNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;

    const note = await Note.findById(req.params.id);
    console.log("------------------------------------------------------------------------------------")
    console.log(note, "note")
    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action.");
    }

    if (note) {
        note.title = title;
        note.content = content;
        note.category = category;

        const updatedNote = await note.save();
        res.json(updatedNote);
    } else {
        res.status(404);
        throw new Error("Note not found.");
    }


});

module.exports = {
    getNotes,
    getNoteById,
    createNote,
    deleteNote,
    updateNote
}
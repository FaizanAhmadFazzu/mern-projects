const express = require("express");
const dotenv = require("dotenv");
const notes = require("./data/notes");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express(); // main thing
dotenv.config();

connectDB();

app.get("/", (req, res) => {
    res.send("API is running...");
})

app.get("/api/notes", (req, res) => {
    res.json(notes)
})

app.get("/api/notes/:id", (req, res) => {
    const note = notes.find(n => n.id == req.params.id);
    res.send(note);
})

app.use(express.json()); // to accept json data


app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on PORT ${PORT}`));
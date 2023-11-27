const Note = require("../models/note");

// Create a new note.
//commit i guess
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id; // Assuming you have middleware to verify user authentication

    const note = await Note.create({
      title,
      content,
      user: userId,
    });

    res.status(201).json({ note });
  } catch (error) {
    res.status(500).json({ error: "Unable to create note" });
  }
};

//for revisions
// Get all notes for a specific user
const getAllNotes = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to verify user authentication

    const notes = await Note.find({ user: userId });

    res.json({ notes });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch notes" });
  }
};

// Get a single note by ID
const getNoteById = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to verify user authentication
    const noteId = req.params.id;

    const note = await Note.findOne({ _id: noteId, user: userId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ note });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch note" });
  }
};

// Update a note by ID
const updateNoteById = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to verify user authentication
    const noteId = req.params.id;
    const { title, content } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: noteId, user: userId },
      { title, content },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ note });
  } catch (error) {
    res.status(500).json({ error: "Unable to update note" });
  }
};

// Delete a note by ID
const deleteNoteById = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have middleware to verify user authentication
    const noteId = req.params.id;

    const note = await Note.findOneAndDelete({ _id: noteId, user: userId });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to delete note" });
  }
};

module.exports = {
  createNote,
  getAllNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById,
};

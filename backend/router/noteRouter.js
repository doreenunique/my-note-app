const router = require("express").Router();
const noteController = require("../controllers/noteController");
const authMiddleware = require("../middleware/authMiddleware");

// Middleware to verify user authentication
router.use(authMiddleware);

// Routes
router.post("/", noteController.createNote);
router.get("/", noteController.getAllNotes);
router.get("/:id", noteController.getNoteById);
router.put("/:id", noteController.updateNoteById);
router.delete("/:id", noteController.deleteNoteById);

module.exports = router;


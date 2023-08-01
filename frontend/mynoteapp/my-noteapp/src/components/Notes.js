import { useState, useEffect } from "react";
import axios from "axios";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    axios
      .get("http://localhost:3636/notes", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setNotes(response.data.notes);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNote = () => {
    axios
      .post(
        "http://localhost:3636/notes",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        fetchNotes();
        setTitle("");
        setContent("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteNote = (noteId) => {
    axios
      .delete(`http://localhost:3636/notes/${noteId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        fetchNotes();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Todo page</h1>
      <div>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <textarea
          value={content}
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <button onClick={addNote}>Add Note</button>
      </div>

      <div>
        {notes.map((note) => (
          <div key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => deleteNote(note._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Notes;

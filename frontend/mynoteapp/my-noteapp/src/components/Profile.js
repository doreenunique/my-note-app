import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    _id: "",
    email: "",
  });
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios
        .post("http://localhost:3636/user/verify", { token })
        .then(({ data }) => {
          if (data._id) {
            setUser(data);
            fetchUserNotes(data._id);
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          alert(`${error}`);
        });
    } else {
      navigate("/");
    }
  }, [navigate]);

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function fetchUserNotes(userId) {
    axios
      .get(`http://localhost:3636/notes/user/${userId}`)
      .then(({ data }) => {
        setNotes(data.notes);
      })
      .catch((error) => {
        alert("Unable to fetch notes");
      });
  }

  function createNote() {
    const { title, content } = newNote;
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Check if the token is present

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }; 
    axios
      .post("http://localhost:3636/notes", { title, content })
      .then(({ data }) => {
        setNotes([...notes, data.note]);
        setNewNote({
          title: "",
          content: "",
        });
      })
      .catch((error) => {
        alert("Unable to create note");
      });
  }

  function deleteNote(noteId) {
    const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
    axios
      .delete(`http://localhost:3636/notes/${noteId}`)
      .then(() => {
        setNotes(notes.filter((note) => note._id !== noteId));
      })
      .catch((error) => {
        alert("Unable to delete note");
      });
  }

  return (
    <div className="App">
      <h1>This is the account of {user.email}</h1>
      <button onClick={() => logout()} className="button">
        Logout
      </button>

      <div className="create-note">
        <h2>Create New Note</h2>
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <button onClick={() => createNote()}>Save Note</button>
      </div>

      <div className="your-notes">
        <h2>Your Notes</h2>
        {notes.map((note) => (
          <div key={note._id}>
            <h3>{note.title}</h3>
            <p>{note.content} </p> 
            <button onClick={() => deleteNote(note._id)}>Delete</button>
    </div>
  ))}
</div>
</div>
);
        }

 export default Profile;
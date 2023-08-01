import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Notes from './components/Notes';



function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </div>
    </Router>
  );
}




export default App;


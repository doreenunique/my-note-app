import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function toLogin() {
    navigate("/");
  }

  function signup() {
    axios
      .post("http://localhost:3636/user/signup", { email, password })
      .then((response) => {
        console.log(response.data);
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          console.log("Token saved in local storage.");
          navigate("/profile");
        } else {
          alert(`Error: ${response.data.msg}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="signup">
      <p>Signup</p>
      <input
        type="email"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <br />

      <button className="button" onClick={() => signup()}>
        Signup
      </button>

      <p>
        Have an account?
        <a
          href="/"
          onClick={() => {
            toLogin();
          }}
        >
          Login
        </a>{" "}
      </p>
    </div>
  );
}

export default Signup;

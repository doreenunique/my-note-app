import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function toSignup() {
    navigate("/signup");
  }

  function login() {
    axios
      .post("http://localhost:3636/user/login", { email, password })
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          console.log("Token saved in local storage.");
          navigate("/profile");
        } else {
          alert(`Error: ${res.data.msg}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="login">
      <p>Login page</p>
      <input
        type="email"
        placeholder="email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />

      <br />

      <input
        type="password"
        placeholder="password"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />

      <br />

      <button className="button" onClick={() => login()}>
        Login
      </button>

      <p>
        Don't have an account?
        <a href="/signup" onClick={toSignup}>
          Signup
        </a>{" "}
      </p>
    </div>
  );
}

export default Login;

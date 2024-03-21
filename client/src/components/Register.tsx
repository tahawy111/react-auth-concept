/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { username, password },
        { withCredentials: true }
      );

      navigate("/");
    } catch (error: any) {
      toast.error(error.res.data.msg);
    }
  };
  return (
    <div>
      <h1>Join us</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Enter you username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <input
          name="password"
          placeholder="Enter you password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button>Register</button>

        <br />
        <span>
          Already have an account? <Link to={`/login`}>Login</Link>
        </span>
      </form>
    </div>
  );
}

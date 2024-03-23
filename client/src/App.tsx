/* eslint-disable @typescript-eslint/no-unused-vars */
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const refresh = setInterval(() => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/auth/refreshToken`, {
          withCredentials: true,
        })
        .then((res) => {})
        .catch((error) => {
          setIsLoggedIn(false);
          navigate("/login");
        });
    }, 5000);

    return () => clearInterval(refresh);
  }, [navigate]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            axios
              .get(`${import.meta.env.VITE_API_URL}/note/getNote`, {
                withCredentials: true,
              })
              .then((data) => {
                console.log(data);
              });
          }}
        ></button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../utils/utils";
import "../assets/css/login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function doLogin() {
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: username,
          user_password: password,
        }),
      });

      console.log(await response.json());

      const data = await response.json();
      console.log(data);

      setCurrentUser(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <section
      className="login-form vh-100 w-100"
      style={{ backgroundColor: "#252525" }}
    >
      <div className="wrapper h-100">
        <div className="login-form">
          <form>
            <h2 className="text-center">User Login</h2>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="username"
                placeholder="Username"
                required="required"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                required="required"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
                onClick={() => {
                  doLogin().then(() => {
                    navigate("/");
                  });
                }}
              >
                Login
              </button>
            </div>
            <div className="clearfix">
              <p className="text-center small">
                <span className="">Don't have an account?</span>{" "}
                <a href="#" className="text-primary">
                  Sign up here!
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

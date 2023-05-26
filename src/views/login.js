import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../utils/utils";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function doLogin() {
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          user_name: username,
          user_password: password,
        }),
      });

      // console.log(await response.json());

      const data = await response.json()
      console.log(data)

      setCurrentUser(data)
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <section className="vh-100" style={{ backgroundColor: "#f57b4b" }}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign in</h3>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="typeEmailX-2"
                    className="form-control form-control-lg"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                  <label className="form-label" htmlFor="typeEmailX-2">
                    Username
                  </label>
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="typePasswordX-2"
                    className="form-control form-control-lg"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <label className="form-label" htmlFor="typePasswordX-2">
                    Password
                  </label>
                </div>
                <button
                  className="btn btn-primary btn-lg"
                  style={{ background: "#e4460c" }}
                  onClick={() => {
                    doLogin().then(() => {
                      navigate('/')
                    });
                  }}
                >
                  Login
                </button>
                Or
                <button className="btn btn-primary btn-lg" type="submit">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

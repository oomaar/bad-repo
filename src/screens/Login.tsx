import { useState } from "react";
import loginBg from "../img/login-bg.jpg";
import loginPhoto from "../img/login-photo.png";
import loginIcon from "../img/login-icon.png";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const auth = useAuth();

  function handleSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    auth.login(username, password);
  }

  return (
    <div className="login-bg" style={{ backgroundImage: `url('${loginBg}')` }}>
      <div className="login">
        <div className="row m-0">
          <div className="col-md-7 p-0">
            <div className="login-about">
              <div className="logo">
                <span>Fly</span> Insights
              </div>
              <div className="pic">
                <img src={loginPhoto} alt="" />
              </div>
              <h1>Welcome to Fly Insights !</h1>
              <p>
                About system lorem Ipsum is simply dummy text of the printing
                and typesetting industry Ipsum has been the industry's dummy
                text.
              </p>
            </div>
          </div>
          <div className="col-md-5 p-0">
            <div className="login-form">
              <div className="login-icon">
                <i>
                  <img src={loginIcon} alt="" />
                </i>
                <span>Sign in to your account</span>
              </div>
              <form>
                <div className="mb-3 inputIcon">
                  <i className="icon-user-7" />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3 inputIcon">
                  <i className="icon-lock-7" />
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn"
                  onClick={(e) => handleSubmit(e)}
                >
                  Sign in
                </button>
              </form>

              <div className="copyright">
                Copyright © 2022 <span>Fly Insights</span>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

import { useContext, useRef } from "react";
import "./login.scss";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Afeezdev Social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Afeezdevsocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit">
                Log In
            </button>
            <span className="loginForgot">Forgot Password?</span>
          <button className="loginRegisterButton">
              <Link to="/register" style={{ textDecoration: "none" }}>
               <span className="loginRegisterButton">
               Create a New Account
              </span> 
              </Link>
          </button>
          </form>
        </div>
      </div>
    </div>
  );
}
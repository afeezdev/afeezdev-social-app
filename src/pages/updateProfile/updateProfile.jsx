import { useRef, useContext } from "react";
import "./updateProfile.scss";
import { useNavigate } from "react-router-dom"
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";

export default function UpdateProfile() {
  const { user: currentUser } = useContext(AuthContext)
  const city = useRef();
  const from = useRef();
  const relationship = useRef();
  const navigate = useNavigate();

  // const handleClick = async (e) => {
  //   e.preventDefault();
  //   if (passwordAgain.current.value !== password.current.value) {
  //     passwordAgain.current.setCustomValidity("Passwords don't match!");
  //   } else {
  //     const user = {
  //       username: username.current.value,
  //       email: email.current.value,
  //       password: password.current.value,
  //     };
  //     try {
  //       await axios.post("/auth/register", user);
  //       navigate("/login");
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  return (
    <>
      <Topbar />
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft">
            <h3 className="loginLogo">{currentUser.username}</h3>
            <span className="loginDesc">
              Update your profile and connect with friends around you on Afeezdevsocial.
            </span>
          </div>
          <div className="loginRight">
            <form className="loginBox">
              <input
                placeholder="current city"
                ref={city}
                className="loginInput"
              />
              
              <input
                placeholder="where are you from"
                ref={from}
                className="loginInput"
              />
              <select name="status" id="status" className="loginInput" ref={relationship}>
                <option value="volvo">Single</option>
                <option value="saab">Married</option>
                <option value="opel">Divorced</option>
              </select>
              <button className="loginButton" type="submit">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
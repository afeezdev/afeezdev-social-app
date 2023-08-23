import { useRef, useContext } from "react";
import "./updateProfile.scss";
import { useNavigate } from "react-router-dom"
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function UpdateProfile() {
  const { user: currentUser } = useContext(AuthContext)
  const desc = useRef();
  const city = useRef();
  const from = useRef();
  const relationship = useRef();
  const navigate = useNavigate();

  const handleProfile = async (e) => {
    e.preventDefault();
    const updatedProfile = {
      userId: currentUser._id,
      desc: desc.current.value ? desc.current.value : undefined,
      from: from.current.value ? from.current.value : undefined,
      city: city.current.value ? city.current.value : undefined,
      relationship: Number(relationship.current.value)
    };
    try {
        await axios.put(`/users/profile/${currentUser._id}`, updatedProfile);
        alert("Your Profile has been updated")  
        console.log(updatedProfile)
    } catch (err) {}
  };

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
                placeholder="your description"
                ref={desc}
                className="loginInput"
              />
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
                <option value="0">Marital Status?</option>
                <option value="1">Single</option>
                <option value="2">Married</option>
                <option value="3">Divorced</option>
              </select>
              <button className="loginButton" type="submit" onClick={handleProfile}>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
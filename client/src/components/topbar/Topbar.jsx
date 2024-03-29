import "./topbar.scss";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link} from "react-router-dom";
import { useState, useEffect,useContext} from "react";
import { signOut } from "../../signOut";
import Hamburger from 'hamburger-react';
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";



export default function Topbar() {
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [isOpen, setOpen] = useState(false)
  const { user: currentUser} = useContext(AuthContext);
  let menuOpen = "hamburgerClose"

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://afeezdev-social.onrender.com/api/users?username=${currentUser.username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [currentUser]);

  if(isOpen){
    menuOpen = "hamburgerList"
  }else {
    menuOpen = "hamburgerClose"
  }

  return (
    <>
      <div className="topbarContainer">
        <span className="hamburger">
          <Hamburger toggled={isOpen} toggle={setOpen} />
        </span>
        <div className="topbarLeft">
          <Link to="/" style={{ textDecoration: "none" }}>
            <span className="logo">Afeezdevsocial</span>
          </Link>
        </div>
        <div className="topbarCenter">
          {/* <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
            />
          </div> */}
        </div>
        <div className="topbarRight">
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Link>
          <div className="signout" onClick={signOut}>
            Sign Out
          </div>
        </div>
      </div>
        <ul className={menuOpen}>
        <Link to= "/" className="hamburgerListLink">
          <li className="hamburgerListItem"> 
            <span className="hamburgerListItemText">Home Page</span>
          </li>
        </Link>
        <Link to={`/profile/${user.username}`} className="hamburgerListLink">
          <li className="hamburgerListItem"> 
            <span className="hamburgerListItemText">My Profile</span>
          </li>
        </Link>
        <Link to={`/update/profile`} className="hamburgerListLink">
          <li className="hamburgerListItem"> 
            <span className="hamburgerListItemText">Update My Profile</span>
          </li>
        </Link>
        <Link className="hamburgerListLink">
          <li className="hamburgerListItem"> 
            <span className="hamburgerListItemText" onClick={signOut}>Sign Out</span>
          </li>
        </Link>
        </ul>
      </>
  );
}

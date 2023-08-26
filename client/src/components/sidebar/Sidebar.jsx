import "./sidebar.scss";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  AccountBoxIcon,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import CloseFriend from "../closeFriend/CloseFriend";
import axios from "axios";
import { Link } from "react-router-dom";
import { signOut } from "../../signOut";

export default function Sidebar() {
  const { user: currentUser } = useContext(AuthContext)
  const [myFriends, setMyFriends] = useState([]);
  

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + currentUser._id);
        setMyFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUser._id, myFriends]);

    return (
    <div className="sidebar">
      <div className="sidebarWrapper">
      <ul className="sidebarList">
        <Link to={`/profile/${currentUser.username}`} className="sidebarListLink">
          <li className="sidebarListItem"> 
            <span className="sidebarListItemText">My Profile</span>
          </li>
        </Link>
        <Link to={`/update/profile`} className="sidebarListLink">
          <li className="sidebarListItem"> 
            <span className="sidebarListItemText">Update My Profile</span>
          </li>
        </Link>
        <Link className="sidebarListLink">
          <li className="sidebarListItem"> 
            <span className="sidebarListItemText" onClick={signOut}>Sign Out</span>
          </li>
        </Link>
        </ul>
        {/* <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul> */}
        {/* <button className="sidebarButton">Show More</button> */}
        <hr className="sidebarHr" />
        <span><h2>My Friends</h2></span> <br />
        <ul className="sidebarFriendList">
          {myFriends.map((u) => (
            <CloseFriend key={u._id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
import "./rightbar.scss";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [friends, setFriends] = useState([]);
  const [users, setUsers] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );
  
  useEffect(() => {
    const getFriends = async () => {
      try {
        if(user._id) {
          setFollowed(currentUser.followings.includes(user._id))
          const friendList = await axios.get("https://afeezdev-social.onrender.com/api/users/friends/" + user._id);
          setFriends(friendList.data);
      }else { setFollowed(false)}
        
      } catch (err) {
        
      }
    };
    getFriends();
  }, [user, currentUser]);

   useEffect(() => {
    let otherUsers = [];
    const getAllUsers = async () => {
      try {
        const allUsers = await axios.get("https://afeezdev-social.onrender.com/api/users/allUsers");
        for (let i = 0; i < allUsers.data.length; i++) {
          if(currentUser._id !== allUsers.data[i]._id) {
            otherUsers.push(allUsers.data[i])
          } 
        }
        setUsers(otherUsers);
      } catch (err) { 
      }
    };
    getAllUsers();
  }, [users._id]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`https://afeezdev-social.onrender.com/api/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`https://afeezdev-social.onrender.com/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };


  const HomeRightbar = () => {
    return (
      <>
      <div className="birthdayContainer">
        <img className="birthdayImg" src="assets/gift.png" alt="" />
        <span className="birthdayText">
          <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
        </span>
      </div>
      <img className="rightbarAd" src="assets/ad.png" alt="" />
      <h4 className="rightbarTitle">Suggested Friends</h4>
      <ul className="rightbarFriendList">
        {users.map((u) => (
          <Online key={u.id} user={u}  />
        ))}
      </ul>
    </>
    );
  };

  const ProfileRightbar = () => {
 
    
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
        
        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue"  key={user.id}>{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue" >
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : user.relationship ===3
                ?"Divorced"
                : undefined
                }
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings" >
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
              key={friend._id}
            >
              <div className="rightbarFollowing" >
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar friend = {friends} />}
      </div>
    </div>
  );
}

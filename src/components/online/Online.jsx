import { Link } from "react-router-dom";
import "./online.scss";

export default function Online({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  return (
    <div className="rightbarFriend">
       <Link
              to={"/profile/" + user.username}
              style={{ textDecoration: "none" }}
              key={user.id}
            >
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={PF+user.profilePicture} alt="" />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
      </Link>
    </div>
  );
}

import "./profile.scss";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { Cancel, Add } from "@material-ui/icons";


export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const username = useParams().username;
  const [file, setFile] = useState(null);
  const { user: currentUser} = useContext(AuthContext);


  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://afeezdev-social.onrender.com/api/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const uploadHandler = async (e) => {
    e.preventDefault();
    const updatedProfilePicture = {
      userId: user._id,
    };
    if (file) {
      const data = new FormData();
      const fileName = file.name.replace(file.name, "profilePicture.JPG");
      data.set("name", fileName);
      data.set("file", file);
      updatedProfilePicture.profilePicture = fileName;
      try { 
        await axios.post("https://afeezdev-social.onrender.com/api/upload", data);
      } catch (err) {}
    }
    try {
        await axios.put(`https://afeezdev-social.onrender.com/api/users/picture/${user._id}`, updatedProfilePicture);
        window.location.reload();            
    } catch (err) {}
  };
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + "person/noCover.png"
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
              <hr className="profileHr" />
                {file && (
                  <div className="profileImgContainer">
                    <img className="profileImg" src={URL.createObjectURL(file)} alt="" />
                    <Cancel className="profileCancelImg" onClick={() => setFile(null)} />
                  </div>
                )}
              {user.username === currentUser.username && (    
                <>
                 <label htmlFor="profilefile" className="profileOption">
                      <span className="profileOptionText"> 
                        <span className="changeProfilePicture">
                          Change Profile Picture<Add/>
                        </span>
                      </span>
                      <input
                        style={{ display: "none" }}
                        type="file"
                        id="profilefile"
                        accept=".png,.jpeg,.jpg"
                        onChange={(e) => setFile(e.target.files[0])}
                      /> <br />
                    </label>
                    <button className="changeProfilePicture" type="submit" onClick={uploadHandler}>
                    Upload
                  </button>
                </>            
              )}              
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
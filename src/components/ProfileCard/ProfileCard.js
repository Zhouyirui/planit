import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { database } from "../../config/firebase";
import "./ProfileCard.css";

function ProfileCard() {
  const { currentUser } = useAuth();
  const [username, setUsername] = useState();
  useEffect(() => {
    database.users
      .doc(currentUser?.uid)
      .get()
      .then((doc) => {
        setUsername(doc.data().username);
      });
  }, [currentUser]);

  return (
    <div className="main-container">
      <div className="profile-card">
        <div className="profile-card-body">
          <div className="profile-pic">
            Profile Picture currently not supported
          </div>
          <h1 style={{ padding: "1rem 0 1rem 0" }}>My Profile</h1>
          <p>Username: {username}</p>
          <p>Email: {currentUser.email}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

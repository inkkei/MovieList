import { UserContext } from "../components/UserContext";
import { useContext } from "react";
import { auth, provider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Info = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider);
    navigate("/");
  };

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="about__container container">
      <h1>Info about this web-application</h1>
      <div className="about-text">
        <p>
          To using all functions of this web-application you should sign-in with
          Google Account
          <div className="login-body">
            {!user ? (
              <button onClick={signInWithGoogle}>Sign In</button>
            ) : (
              <>
                <p>
                  Hello, <span>{user?.displayName}!</span>
                </p>
                <p>{user?.email}</p>
                <p>
                  <img src={user?.photoURL} alt="user-image" />
                </p>
                <p>
                  <button onClick={signUserOut}>Sign Out</button>
                </p>
              </>
            )}
          </div>
        </p>
      </div>
    </div>
  );
};

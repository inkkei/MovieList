import { auth, provider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/UserContext";
import { useContext } from "react";

export const Account = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider);
    navigate("/");
  };

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="login__container container">
      <div className="login-body">
        {!user ? (
          <>
            <h1>Hello, Guest!</h1>
            <h2>Sign in with Google</h2>
            <button onClick={signInWithGoogle}>Sign In</button>
          </>
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
    </div>
  );
};

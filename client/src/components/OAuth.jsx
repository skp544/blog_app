import React, { useState } from "react";
import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../lib/firebase.js";
import { googleAuthApi } from "../apis/auth.js";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice.js";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const [loading, setLoading] = useState(false);
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();

    provider.getCustomParameters({ prompt: "select_account" });

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);

      const formData = {
        name: resultFromGoogle.user.displayName,
        email: resultFromGoogle.user.email,
        photoUrl: resultFromGoogle.user.photoURL,
      };
      setLoading(true);
      const response = await googleAuthApi(formData);
      setLoading(false);

      if (!response?.success) {
        return toast.error(response?.message);
      }
      dispatch(login({ token: response?.token, user: response?.user }));
      toast.success(response.message);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button
      type={"button"}
      gradientDuoTone={"pinkToOrange"}
      outline
      onClick={handleGoogleClick}
    >
      <AiFillGoogleCircle className={"mr-2 h-6 w-6"} />
      {loading ? "Logging In..." : "Continue with Google"}
    </Button>
  );
};
export default OAuth;

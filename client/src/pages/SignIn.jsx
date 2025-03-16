import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { signInApi } from "../apis/auth.js";
import toast from "react-hot-toast";
import { login } from "../redux/authSlice.js";
import { useDispatch } from "react-redux";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await signInApi(formData);
    setLoading(false);

    if (!response.success) {
      return toast.error(response?.message);
    }

    toast.success(response?.message);
    localStorage.setItem("authToken", response.token);
    dispatch(login({ token: response.token, user: response.user }));

    navigate("/");
  };
  return (
    <div className={"mt-20 min-h-screen"}>
      <div
        className={
          "mx-auto flex max-w-3xl flex-col gap-x-5 p-3 md:flex-row md:items-center"
        }
      >
        {/* left */}
        <div className={"flex-1"}>
          <div className={"text-4xl font-bold dark:text-white"}>
            <span
              className={
                "rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 py-1 text-white"
              }
            >
              Blog
            </span>{" "}
            App
          </div>

          <p className={"mt-5 text-sm"}>
            You can sign in with your username and password or with google
          </p>
        </div>

        {/*  right */}
        <div className={"flex-1"}>
          <form className={"flex flex-col gap-4"} onSubmit={handleSubmit}>
            <div className={""}>
              <Label value={"Your Username"} />
              <TextInput
                type={"text"}
                placeholder={"username"}
                id={"username"}
                name={"username"}
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className={""}>
              <Label value={"Your Password"} />
              <TextInput
                type={"password"}
                placeholder={"******"}
                id={"password"}
                name={"password"}
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              disabled={loading}
              gradientDuoTone={"purpleToPink"}
              type={"submit"}
            >
              {loading ? "Signing up..." : "Login"}
            </Button>

            <span className={"text-center text-lg font-semibold text-gray-400"}>
              OR
            </span>

            <OAuth />
          </form>

          <div className={"mt-3 flex gap-2 text-sm"}>
            <span>Don't have an account? </span>
            <Link to={"/sign-up"} className={"text-blue-600 hover:underline"}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;

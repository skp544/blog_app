import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import toast from "react-hot-toast";
import { signUpApi } from "../apis/auth.js";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await signUpApi(formData);

    console.log(response);

    if (response?.success) {
      toast.success(response.message);
      localStorage.setItem("authToken", response.token);
      return navigate("/");
    }

    toast.error(response?.message || "Signup failed, please try again");
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
            You can sign up with your email and password or with google
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
              <Label value={"Your Username"} />
              <TextInput
                type={"email"}
                placeholder={"johndoe@example.com"}
                id={"email"}
                name={"email"}
                value={formData.email}
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

            <Button gradientDuoTone={"purpleToPink"} type={"submit"}>
              Sign Up
            </Button>
          </form>

          <div className={"mt-3 flex gap-2 text-sm"}>
            <span>Already have an account? </span>
            <Link to={"/login"} className={"text-blue-600 hover:underline"}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignUp;

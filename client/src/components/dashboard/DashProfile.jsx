import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextInput } from "flowbite-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsBoxArrowInLeft } from "react-icons/bs";
import { logout, update } from "../../redux/authSlice.js";
import { deleteUserApi, updateUserApi } from "../../apis/user.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const DashProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();

  const handleSignOut = () => {
    dispatch(logout());
  };

  const handleDeleteUser = async () => {
    const response = await deleteUserApi();
    if (!response.success) {
      return toast.error(response.message);
    }
    toast.success(response.message);
    dispatch(logout());
    navigate("/sign-up");
  };

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("username", formData.username);
    newFormData.append("email", formData.email);
    newFormData.append("password", formData.password);
    newFormData.append("profilePhoto", imageFile);

    const response = await updateUserApi(newFormData);

    if (!response.success) {
      return toast.error(response.message);
    }

    toast.success(response.message);
    dispatch(update({ user: response.user }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  return (
    <div className={"mx-auto w-full max-w-lg p-3"}>
      <h1 className={"my-7 text-center text-3xl font-semibold"}>Profile</h1>

      <form className={"flex flex-col gap-4"} onSubmit={handleUpdateUser}>
        <input
          type={"file"}
          accept={"image/*"}
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className={
            "h-32 w-32 cursor-pointer self-center overflow-hidden rounded-full shadow-md"
          }
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl ? imageFileUrl : user.photoUrl}
            alt={user?.username}
            className={
              "border-[l h-full w-full rounded-full border-8 border-[lightGray] object-cover"
            }
          />
        </div>
        <TextInput
          type={"text"}
          id={"username"}
          name={"username"}
          value={formData.username}
          onChange={handleChangeInput}
        />
        <TextInput
          type={"email"}
          id={"email"}
          name={"email"}
          value={formData.email}
          onChange={handleChangeInput}
        />
        <TextInput
          type={"password"}
          id={"password"}
          name={"password"}
          placeholder={"*****"}
          value={formData.password}
          onChange={handleChangeInput}
        />

        <Button gradientDuoTone={"purpleToBlue"} type={"submit"} outline>
          Update
        </Button>
      </form>

      <div className={"mt-4 flex items-center justify-between"}>
        <Button
          className={"flex cursor-pointer items-center justify-center gap-x-2"}
          color="failure"
          type={"button"}
          onClick={handleDeleteUser}
        >
          <RiDeleteBin6Line className={"h-5 w-5"} />{" "}
          <span className={"ml-2"}>Delete Account</span>
        </Button>

        <Button
          type={"button"}
          onClick={handleSignOut}
          color={"gray"}
          className={"flex cursor-pointer items-center justify-center gap-x-2"}
        >
          <BsBoxArrowInLeft className={"h-5 w-5"} />{" "}
          <span className={"ml-2"}>Sign Out</span>
        </Button>
      </div>
    </div>
  );
};
export default DashProfile;

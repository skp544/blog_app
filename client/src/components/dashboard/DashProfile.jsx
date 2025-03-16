import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Button, TextInput } from "flowbite-react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsBoxArrowInLeft } from "react-icons/bs";

const DashProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();

  const handleChangeInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async () => {};

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  return (
    <div className={"mx-auto w-full max-w-lg p-3"}>
      <h1 className={"my-7 text-center text-3xl font-semibold"}>Profile</h1>

      <form className={"flex flex-col gap-4"}>
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
          defaultValue={user.username}
          value={formData.username}
          onChange={handleChangeInput}
        />
        <TextInput
          type={"email"}
          id={"email"}
          name={"email"}
          defaultValue={user.email}
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

        <Button gradientDuoTone={"purpleToBlue"} className={"submit"} outline>
          Update
        </Button>
      </form>

      <div className={"mt-4 flex items-center justify-between"}>
        <Button
          className={"flex cursor-pointer items-center justify-center gap-x-2"}
          color="failure"
        >
          <RiDeleteBin6Line className={"h-5 w-5"} />{" "}
          <span className={"ml-2"}>Delete Account</span>
        </Button>

        <Button
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

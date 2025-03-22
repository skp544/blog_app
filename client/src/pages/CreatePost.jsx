import React, { useState } from "react";
import { FileInput, Select, TextInput, Button } from "flowbite-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { createPostApi } from "../apis/post.js";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "uncategorized",
    content: "",
  });
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append("title", formData.title);
    newFormData.append("category", formData.category);
    newFormData.append("content", formData.content);
    newFormData.append("postImage", imageFile);

    setLoading(true);
    const response = await createPostApi(newFormData);
    setLoading(false);
    if (!response.success) {
      return toast.error(response.message);
    }

    toast.success("Post created successfully");
    setFormData({ title: "", category: "uncategorized", content: "" });
    setImageFile(null);
    setImageFileUrl(null);
  };

  return (
    <div className="mx-auto min-h-screen max-w-3xl p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Create a post</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <TextInput
            type="text"
            name="title"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={handleChange}
            value={formData.title}
          />
          <Select
            id="category"
            name="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="nodejs">Node js</option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4 border-4 border-dotted border-teal-500 p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {imageFile && imageFileUrl && (
            <img
              src={imageFileUrl}
              alt="upload"
              className="h-72 w-full object-cover"
            />
          )}
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="mb-12 h-72 placeholder:dark:text-white"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />

        <Button type="submit" gradientDuoTone="purpleToPink">
          {loading ? "Publishing..." : "Publish"}
        </Button>
      </form>
    </div>
  );
};
export default CreatePost;

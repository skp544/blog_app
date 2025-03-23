import React, { useEffect, useState } from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPostApi, updatePostApi } from "../apis/post.js";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import toast from "react-hot-toast";

const UpdatePost = () => {
  const { postId } = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  const fetchData = async () => {
    const response = await fetchPostApi(postId);

    if (!response.success) {
      console.log(response.message);
    }

    const { title, content, category, postImage } = response.post;
    setFormData({ title, content, category });
    setImageFileUrl(postImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormData = new FormData();
    newFormData.append("title", formData.title);
    newFormData.append("content", formData.content);
    newFormData.append("category", formData.category);
    newFormData.append("postImage", imageFile);

    setLoading(true);
    const response = await updatePostApi(postId, newFormData);
    setLoading(false);

    if (!response.success) {
      return toast.error(response.message);
    }

    toast.success(response.message);
    navigate("/dashboard?tab=posts");
  };

  useEffect(() => {
    if (postId) {
      fetchData();
    }
  }, [postId]);

  return (
    <div className="mx-auto min-h-screen max-w-3xl p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Update post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col justify-between gap-4 sm:flex-row">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            value={formData.category}
          >
            <option value="uncategorized">Select a category</option>
            <option value="javascript">JavaScript</option>
            <option value="reactjs">React.js</option>
            <option value="nextjs">Next.js</option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4 border-4 border-dotted border-teal-500 p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        {imageFileUrl && (
          <img
            src={imageFileUrl}
            alt="upload"
            className="h-72 w-full object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          value={formData.content}
          placeholder="Write something..."
          className="mb-12 h-72"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="purpleToPink">
          {loading ? "Updating..." : "Update post"}
        </Button>
      </form>
    </div>
  );
};
export default UpdatePost;

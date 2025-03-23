import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Textarea, Button, Modal } from "flowbite-react";
import Comment from "./Comment.jsx";
import { HiOutlineExclamationCircle } from "react-icons/hi2";
import { createCommentApi, getPostCommentsApis } from "../apis/comment.js";
import toast from "react-hot-toast";

const CommentSection = ({ postId }) => {
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const fetchComments = async () => {
    const response = await getPostCommentsApis(postId);
    if (!response.success) {
      return toast.error(response.message);
    }
    setComments(response.comments);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      content: comment,
      postId,
    };

    const response = await createCommentApi(formData);

    if (!response.success) {
      return toast.error(response.message);
    }

    setComment("");
    return toast.success(response.message);
  };

  const handleLike = async () => {};

  const handleEdit = async () => {};

  const handleDelete = async () => {};

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  return (
    <div className="mx-auto w-full max-w-2xl p-3">
      {user ? (
        <div className="my-5 flex items-center gap-1 text-sm text-gray-500">
          <p>Signed in as:</p>
          <img
            className="h-5 w-5 rounded-full object-cover"
            src={user.photoUrl}
            alt="user profile"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-600 hover:underline"
          >
            @{user.username}
          </Link>
        </div>
      ) : (
        <div className="my-5 flex gap-1 text-sm text-teal-500">
          You must be signed in to comment.
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {user && (
        <form
          onSubmit={handleSubmit}
          className="rounded-md border border-teal-500 p-3"
        >
          <Textarea
            placeholder="Add a comment..."
            rows="3"
            maxLength="200"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="mt-5 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              {200 - comment.length} characters remaining
            </p>
            <Button outline gradientDuoTone="purpleToBlue" type="submit">
              Submit
            </Button>
          </div>
        </form>
      )}
      {comments.length === 0 ? (
        <p className="my-5 text-sm">No comments yet!</p>
      ) : (
        <>
          <div className="my-5 flex items-center gap-1 text-sm">
            <p>Comments</p>
            <div className="rounded-sm border border-gray-400 px-2 py-1">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this comment?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => handleDelete(commentToDelete)}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default CommentSection;

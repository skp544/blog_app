import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserApi } from "../apis/user.js";
import toast from "react-hot-toast";
import moment from "moment";
import { Button, Textarea } from "flowbite-react";
import { FaThumbsUp } from "react-icons/fa6";
import { editCommentApi } from "../apis/comment.js";

const Comment = ({ comment, onLike, onEdit, onDelete }) => {
  const { user } = useSelector((state) => state.auth);
  const [commentUser, setCommentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

  const fetchUser = async () => {
    const response = await getUserApi(comment.userId);
    if (!response.success) {
      return toast.error(response.message);
    }
    setCommentUser(response.user);
  };

  const handleSave = async () => {
    const formData = {
      content: editedContent,
    };

    const response = await editCommentApi({ formData, commentId: comment._id });

    if (!response.success) {
      return toast.error(response.message);
    }

    setIsEditing(false);
    onEdit(comment, editedContent);
    return toast.success(response.message);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  useEffect(() => {
    if (comment) {
      fetchUser();
    }
  }, [comment]);

  return (
    <div className="flex border-b p-4 text-sm dark:border-gray-600">
      <div className="mr-3 flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full bg-gray-200"
          src={
            commentUser?.photoUrl ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          alt={commentUser?.username || "anonymous user"}
        />
      </div>
      <div className="flex-1">
        <div className="mb-1 flex items-center">
          <span className="mr-1 truncate text-xs font-bold">
            {commentUser ? `@${commentUser.username}` : "anonymous user"}
          </span>
          <span className="text-xs text-gray-500">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <Textarea
              className="mb-2"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
            <div className="flex justify-end gap-2 text-xs">
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                onClick={handleSave}
              >
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                gradientDuoTone="purpleToBlue"
                outline
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="pb-2 text-gray-500">{comment.content}</p>
            <div className="flex max-w-fit items-center gap-2 border-t pt-2 text-xs dark:border-gray-700">
              <button
                type="button"
                onClick={() => onLike(comment._id)}
                className={`text-gray-400 hover:text-blue-500 ${
                  user && comment.likes.includes(user.id) && "!text-blue-500"
                }`}
              >
                <FaThumbsUp className="text-sm" />
              </button>
              <p className="text-gray-400">
                {comment.numberOfLikes > 0 &&
                  comment.numberOfLikes +
                    " " +
                    (comment.numberOfLikes === 1 ? "like" : "likes")}
              </p>
              {user && (user.id === comment.userId || user.isAdmin) && (
                <>
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(comment._id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Comment;

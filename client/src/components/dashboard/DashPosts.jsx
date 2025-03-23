import React, { useEffect, useState } from "react";
import { deletePostApi, fetchUserPostsApi } from "../../apis/post.js";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Button, Modal, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const DashPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const fetchData = async () => {
    const response = await fetchUserPostsApi({ user });
    if (!response.success) {
      return toast.error(response.message);
    }
    if (response.posts.length < 9) {
      setShowMore(false);
    }
    setUserPosts(response.posts);
  };

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    const response = await fetchUserPostsApi({ user, startIndex });

    if (!response.success) {
      return toast.error(response.message);
    }
    setUserPosts((prev) => [...prev, ...response.posts]);
    if (response.posts.length < 9) {
      setShowMore(false);
    }
  };

  const handleDeletePost = async () => {
    if (!postIdToDelete) return;

    const response = await deletePostApi(postIdToDelete);
    if (!response.success) {
      return toast.error(response.message);
    }
    setShowModal(false);
    setUserPosts(userPosts.filter((post) => post._id !== postIdToDelete));
  };

  useEffect(() => {
    if (user?.isAdmin) {
      fetchData();
    }
  }, [user.id]);

  return (
    <div className="scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 table-auto overflow-x-scroll p-3 md:mx-auto">
      {user.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body className="divide-y">
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={post.postImage}
                        alt={post.title}
                        className="h-10 w-20 bg-gray-500 object-cover"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="font-medium text-gray-900 dark:text-white"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>{post.category}</Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                      className="cursor-pointer font-medium text-red-500 hover:underline"
                    >
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-teal-500 hover:underline"
                      to={`/update-post/${post._id}`}
                    >
                      <span>Edit</span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full self-center py-7 text-sm text-teal-500"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet!</p>
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
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
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
export default DashPosts;

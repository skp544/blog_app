import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteAnotherUserApi, getAllUsersApi } from "../../apis/user.js";
import toast from "react-hot-toast";
import { Button, Modal, Table } from "flowbite-react";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const DashUsers = () => {
  const { user } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchData = async () => {
    const response = await getAllUsersApi({ startIndex: 0 });

    if (!response.success) {
      return toast.error(response.message);
    }
    if (response.users.length < 9) {
      setShowMore(false);
    }
    setUsers(response.users);
  };

  const handleShowMore = async () => {
    if (!user || users.length < 0) {
      return;
    }

    const startIndex = users.length;

    const response = await getAllUsersApi({ startIndex });

    if (!response.success) {
      return toast.error(response.message);
    }

    setUsers((prev) => [...prev, ...response.users]);
    if (response.users.length < 9) {
      setShowMore(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userIdToDelete) {
      return toast.error("No User selected");
    }
    setDeleteLoading(true);
    const response = await deleteAnotherUserApi(userIdToDelete);
    setDeleteLoading(false);

    if (!response.success) {
      return toast.error(response.message);
    }

    setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
    setShowModal(false);
    toast.success(response.message);
  };

  useEffect(() => {
    if (!user || !user.isAdmin) {
      return;
    }
    fetchData();
  }, [user.id]);

  return (
    <div className="scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 table-auto overflow-x-scroll p-3 md:mx-auto">
      {user.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className="divide-y" key={user._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <img
                      src={user.photoUrl}
                      alt={user.username}
                      className="h-10 w-10 rounded-full bg-gray-500 object-cover"
                    />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500" />
                    ) : (
                      <FaTimes className="text-red-500" />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className="cursor-pointer font-medium text-red-500 hover:underline"
                    >
                      Delete
                    </span>
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
        <>
          <p>You have no users yet!</p>
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
              Are you sure you want to delete this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                {deleteLoading ? "Deleting..." : "Yes, I'm sure"}
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
export default DashUsers;

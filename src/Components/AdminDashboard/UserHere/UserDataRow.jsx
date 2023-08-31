import React from "react";
import DeleteModal from "../DeleteModal";
import { useState } from "react";
import EditModal from "./EditModal";
import { deleteuser } from "../../../hooks/users";
import toast from "react-hot-toast";

const UserDataRow = ({ users, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const modalHandler = (id) => {
    deleteuser(id)
      .then((data) => {
        refetch();
        toast.success("User deleted");
      })
      .catch((err) => console.log(err));
    closeModal();
  };
  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{users?.name}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{users?.phone1}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{users?.phone2}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{users?.role}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <p className="text-gray-900 whitespace-no-wrap">{users?.userID}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <p className="text-gray-900 whitespace-no-wrap">{users?.category}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-md">
          <p className="text-gray-900 whitespace-no-wrap">{users?.location}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="action-area flex gap-3">
            <div className="delete-area">
              <span className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-slate-50 leading-tight">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-blue-600  rounded-full"
                ></span>
                <span
                  className="relative"
                  onClick={() => setIsEditModalOpen(true)}
                >
                  Edit
                </span>
              </span>
              <EditModal
                isEditModalOpen={isEditModalOpen}
                closeModal={() => setIsEditModalOpen(false)}
                users={users}
                id={users._id}
                refetch={refetch}
                setIsEditModalOpen={setIsEditModalOpen}
              />
            </div>

            <div className="edit-area">
              <span
                onClick={openModal}
                className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-slate-50 leading-tight"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0  bg-red-600  rounded-full"
                ></span>
                <span className="relative">Delete</span>
              </span>
              <DeleteModal
                isOpen={isOpen}
                closeModal={closeModal}
                modalHandler={modalHandler}
                id={users._id}
              />
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default UserDataRow;

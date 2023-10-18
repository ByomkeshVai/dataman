import React from "react";
import { useState } from "react";
import DeleteModal from "../../Modal/DeleteModal";
import { toast } from "react-hot-toast";
import { deletePackage } from "../../../hooks/package";

const PackageData = ({ items, refetch }) => {
  let [isOpen, setIsOpen] = useState(false);
  let [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const modalHandler = (id) => {
    deletePromo(id)
      .then((data) => {
        refetch();
        toast.success("items deleted");
      })
      .catch((err) => console.log(err));
    closeModal();
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{items?.category}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{items?.name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{items?.price} ৳</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          {items?.duration} Days
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="action-area flex gap-3">
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
              id={items._id}
            />
          </div>
        </div>
      </td>
    </tr>
  );
};

export default PackageData;

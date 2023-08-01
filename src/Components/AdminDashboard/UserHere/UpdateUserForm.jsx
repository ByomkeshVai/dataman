import React from "react";
import { TbFidgetSpinner } from "react-icons/Tb";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

const UpdateUserForm = ({
  handleSubmit,
  loading,
  handleImageUpdate,
  itemDatas,
  setItemDatas,
}) => {
  const professions = [
    "Electrician",
    "Key Maker",
    "Driver",
    "Plumber",
    "Carpenter",
    "Painter",
  ];

  const locations = [
    "Block A",
    "Block B",
    "Block C",
    "Block D",
    "Block E",
    "Block H",
  ];
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-1 text-sm">
            <label htmlFor="name" className="block text-gray-600">
              User Name
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
              name="name"
              value={itemDatas?.name}
              onChange={(event) =>
                setItemDatas({ ...itemDatas, name: event.target.value })
              }
              id="name"
              type="text"
              placeholder="Item Name"
              defaultValue={itemDatas?.phone1}
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="phone1" className="block text-gray-600">
              Phone
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
              name="phone1"
              value={itemDatas?.phone1}
              type="text"
              placeholder="Phone (Verfied)"
            />
          </div>

          <div className="space-y-1 text-sm">
            <label htmlFor="name" className="block text-gray-600">
              Secondary Phone
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
              name="phone2"
              value={itemDatas?.phone2}
              onChange={(event) =>
                setItemDatas({ ...itemDatas, phone2: event.target.value })
              }
              id="phone2"
              type="text"
              placeholder="Phone 2"
              defaultValue={itemDatas?.phone2}
              required
            />
          </div>

          <div className="space-y-1 text-sm">
            <label className="label" htmlFor="professionSelect">
              Select Profession:
            </label>
            <select
              className="input input-bordered"
              name="profession"
              value={itemDatas?.profession}
              onChange={(event) =>
                setItemDatas({ ...itemDatas, profession: event.target.value })
              }
              defaultValue={itemDatas?.profession}
            >
              {professions.map((profession) => (
                <option
                  defaultValue={itemDatas?.profession}
                  key={profession}
                  value={profession}
                >
                  {profession}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1 text-sm">
            <label className="label" htmlFor="professionSelect">
              Change Location:
            </label>
            <select
              className="input input-bordered"
              name="profession"
              value={itemDatas?.location}
              onChange={(event) =>
                setItemDatas({ ...itemDatas, location: event.target.value })
              }
              defaultValue={itemDatas?.location}
            >
              {locations.map((location) => (
                <option
                  defaultValue={itemDatas?.location}
                  key={location}
                  value={location}
                >
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className=" p-4 bg-white w-full  m-auto rounded-lg">
            <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
              <div className="flex flex-col w-max mx-auto text-center">
                <label>
                  <input
                    onChange={(event) => {
                      handleImageUpdate(event.target.files[0]);
                    }}
                    className="text-sm cursor-pointer w-36 hidden"
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    hidden
                  />
                  <div className="bg-rose-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-rose-500">
                    Upload Image
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-rose-500"
        >
          {loading ? (
            <TbFidgetSpinner className="m-auto animate-spin" size={24} />
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateUserForm;

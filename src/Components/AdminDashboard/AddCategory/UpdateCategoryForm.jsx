import React from "react";
import { TbFidgetSpinner } from "react-icons/Tb";

const UpdateCategoryForm = ({
  handleSubmit,
  loading,
  handleImageUpdate,
  itemDatas,
  setItemDatas,
}) => {
  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-1 text-sm">
            <label htmlFor="label" className="block text-gray-600">
              Category
            </label>
            <input
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
              name="label"
              value={itemDatas?.category}
              onChange={(event) =>
                setItemDatas({ ...itemDatas, category: event.target.value })
              }
              id="name"
              type="text"
              placeholder="Sub Category"
              defaultValue={itemDatas?.stock}
              required
            />
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
          <div className="space-y-1 text-sm">
            <label htmlFor="description" className="block text-gray-600">
              Description
            </label>
            <input
              value={itemDatas?.description}
              onChange={(event) =>
                setItemDatas({
                  ...itemDatas,
                  description: event.target.value,
                })
              }
              className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
              name="description"
              id="description"
              type="text"
              placeholder="description"
            />
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

export default UpdateCategoryForm;

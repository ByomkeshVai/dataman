import React from "react";
import { TbFidgetSpinner } from "react-icons/Tb";

const AddCategoryForm = ({
  handleSubmit,
  loading,
  handleImageChange,
  uploadButtonText,
}) => {
  return (
    <div className="max-w-screen-xl mx-auto min-h-[calc(100vh-270px)] flex flex-col justify-center  text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto lg:w-3/6 w-full">
          <div className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-1 text-sm">
                <label htmlFor="category" className="block text-gray-600">
                  Category
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="category"
                  id="category"
                  type="text"
                  placeholder="Category Name"
                  required
                />
              </div>
            </div>

            <div className=" p-4 bg-white w-full  m-auto rounded-lg">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      onChange={(event) => {
                        handleImageChange(event.target.files[0]);
                      }}
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-[#085885] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-info-500">
                      {uploadButtonText}
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
                className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                name="description"
                id="description"
                type="text"
                placeholder="Category Description"
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#085885]"
            >
              {loading ? (
                <TbFidgetSpinner className="m-auto animate-spin" size={24} />
              ) : (
                "Save & Continue"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;

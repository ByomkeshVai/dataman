import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { addPackage } from "../../../hooks/package";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

const AddPackage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [axiosSecure] = useAxiosSecure();
  const { refetch, data: items = [] } = useQuery({
    queryKey: ["items"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/all/category`
      );

      return res.data;
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const name = event.target.name.value;
    const category = event.target.category.value;
    const price = event.target.price.value;
    const duration = event.target.duration.value;
    const itemData = {
      name,
      category,
      price: parseInt(price),
      duration: parseInt(duration),
    };

    addPackage(itemData)
      .then((data) => {
        setLoading(false);
        toast.success("Package Has Added");
        navigate("/admin/dashboard/all-package");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-screen-xl mx-auto min-h-[calc(100vh-270px)] flex flex-col justify-center  text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="mx-auto lg:w-3/6 w-full">
          <div className="space-y-6">
            <div className="space-y-1 text-sm mx-auto">
              <label htmlFor="product" className="block text-gray-600">
                Category
              </label>
              <select
                required
                className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                name="category"
              >
                {items.map((items) => (
                  <option value={items.category} key={items._id}>
                    {items.category}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-6">
              <div className="space-y-1 text-sm">
                <label htmlFor="name" className="block text-gray-600">
                  Package Name
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Package Name"
                  required
                />
              </div>
            </div>

            <div className="lg:flex lg:flex-row flex-col justify-between gap-2">
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600">
                  Price
                </label>
                <div className="flex items-center gap-3">
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                    name="price"
                    id="price"
                    type="number"
                    placeholder="Price"
                  />
                  <span>৳</span>
                </div>
              </div>

              <div className="space-y-1 text-sm">
                <label htmlFor="duration" className="block text-gray-600">
                  Package Duration
                </label>
                <div className="flex items-center gap-3">
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md "
                    name="duration"
                    id="duration"
                    type="number"
                    placeholder="Duration"
                  />
                  <span className="text-md">Days</span>
                </div>
              </div>
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

export default AddPackage;

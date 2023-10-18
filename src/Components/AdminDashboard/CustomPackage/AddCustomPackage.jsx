import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";

const AddCustomPackage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [axiosSecure] = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const { refetch, data: singleUser = [] } = useQuery({
    queryKey: ["singleUser"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `${import.meta.env.VITE_API_URL}/all/package`
      );

      return res.data;
    },
  });

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedName, setSelectedName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");

  const [suggestions, setSuggestions] = useState([]); // State for suggestions

  const handleNameChange = (e) => {
    const searchValue = e.target.value;
    setSearchQuery(searchValue);

    // Reset selected values when the user types in the search field
    setSelectedName("");
    setSelectedCategory("");
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchQuery(searchValue);

    // Filter suggestions based on search query
    const filteredSuggestions = singleUser.filter(
      (person) =>
        person.name.toLowerCase().includes(searchValue.toLowerCase()) ||
        person.category.toString().includes(searchValue)
    );
    setSuggestions(filteredSuggestions);

    // Update selected user's name if it matches the search query
    const selectedPerson = filteredSuggestions.find(
      (person) => person.name.toLowerCase() === searchValue.toLowerCase()
    );
    if (selectedPerson) {
      setSelectedName(selectedPerson.name);
      setSelectedCategory(selectedPerson.category);
    }
  };

  const handleSuggestionClick = (selectedPerson) => {
    setSelectedName(selectedPerson.name);
    setSelectedCategory(selectedPerson.category);
    setSearchQuery(""); // Clear search query
    setSuggestions([]); // Clear suggestions after selection
  };

  const [packageFields, setPackageFields] = useState([{ id: 1 }]);
  const nextPackageId = packageFields.length + 1;

  const [selectedPackages, setSelectedPackages] = useState([]);
  const availablePackages = singleUser.filter(
    (person) => !selectedPackages.includes(person.name)
  );

  const addPackageField = () => {
    setPackageFields([...packageFields, { id: nextPackageId }]);
  };

  const removePackageField = (id) => {
    const updatedFields = packageFields.filter((field) => field.id !== id);
    setPackageFields(updatedFields);

    // Remove the selected package associated with the removed field
    const removedFieldName = `selectPackage-${id}`;
    const removedPackageName = selectedPackages.find((name) =>
      name.startsWith(removedFieldName)
    );

    if (removedPackageName) {
      setSelectedPackages((prev) =>
        prev.filter((name) => name !== removedPackageName)
      );

      // Clear the field value associated with the removed package
      const fieldName = `selectPackage-${id}`;
      setValue(fieldName, ""); // Clear the value for the removed field
    }
  };

  const onSubmit = (data) => {
    // Create a set to keep track of removed package IDs
    const removedPackageIds = new Set();

    // Filter out removed packages from selectedPackages state
    const updatedSelectedPackages = selectedPackages.filter(
      (selectedPackage) => {
        // Check if the selectedPackage exists in the form data
        const fieldName = `selectPackage-${selectedPackage.id}`;
        const selectedPackageName = data[fieldName];

        if (selectedPackageName === selectedPackage.name) {
          return true; // Keep this package
        } else {
          // Package has been removed
          removedPackageIds.add(selectedPackage.id);
          return false; // Exclude this package
        }
      }
    );

    // Remove the removed package names from the data
    for (const id of removedPackageIds) {
      const fieldName = `selectPackage-${id}`;
      delete data[fieldName];
    }

    // Update the selectedPackages state
    setSelectedPackages(updatedSelectedPackages);

    // Handle form submission with the filtered data
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title>Dataman - Custom Packages</title>
      </Helmet>
      <div>
        <div className="max-w-screen-3xl mx-auto min-h-[calc(100vh-270px)] flex flex-col justify-center  text-gray-800 rounded-xl bg-gray-50">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mx-auto lg:w-3/6 w-full">
              <div className="space-y-6">
                <div className="space-y-6">
                  <div className="space-y-1 text-sm">
                    <label htmlFor="title" className="block text-gray-600">
                      Package Title
                    </label>
                    <Controller
                      name="title"
                      control={control}
                      rules={{ required: "Package title is required" }}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
                          placeholder="Package title"
                        />
                      )}
                    />
                    {errors.title && (
                      <p className="text-red-500">{errors.title.message}</p>
                    )}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-1 text-sm">
                    <label htmlFor="subtitle" className="block text-gray-600">
                      Package SubTitle
                    </label>
                    <Controller
                      name="subtitle"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
                          placeholder="Package subtitle"
                        />
                      )}
                    />
                  </div>
                </div>

                {packageFields.map((packageField, index) => (
                  <div key={packageField.id} className="space-y-1 text-sm">
                    <label
                      htmlFor={`selectPackage-${packageField.id}`}
                      className="block text-gray-600"
                    >
                      Package {index + 1}
                    </label>
                    <div className="flex items-center">
                      <Controller
                        name={`selectPackage-${packageField.id}`}
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full px-4 py-3 border-rose-300 focus:outline-rose-500 rounded-md"
                          >
                            <option value="">Select a name</option>
                            {availablePackages.map((person) => (
                              <option key={person._id} value={person.name}>
                                {person.name +
                                  " " +
                                  `(${person.category})` +
                                  `- ${person.price} BDT`}
                              </option>
                            ))}
                          </select>
                        )}
                      />

                      <button
                        type="button"
                        className="ml-2 text-red-500"
                        onClick={() => removePackageField(packageField.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="w-full p-3 mt-2 text-center font-medium text-gray-800 transition duration-200 rounded shadow-md bg-[#ddd]"
                  onClick={addPackageField}
                >
                  Add Package
                </button>

                <div className="lg:flex lg:flex-row flex-col justify-between gap-2">
                  <div className="space-y-1 text-sm">
                    <label htmlFor="price" className="block text-gray-600">
                      Price
                    </label>
                    <div className="flex items-center gap-3">
                      <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            className="w-full px-4 py-3 text-gray-800 border border-rose-300 focus:outline-rose-500 rounded-md"
                            type="number"
                            placeholder="Price"
                          />
                        )}
                      />
                      <span>৳</span>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#085885]"
                >
                  Save & Continue
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCustomPackage;

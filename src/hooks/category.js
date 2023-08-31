// add a item
export const addCategory = async (itemData) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/category`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
    body: JSON.stringify(itemData),
  });

  const data = await response.json();
  return data;
};

// Delete a item
export const deleteCategory = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/category/${id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
    }
  );
  const result = await response.json();
  return result;
};

export const editCategory = async (itemData, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/edit/category/${id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify(itemData),
    }
  );
  const result = await response.json();
  return result;
};

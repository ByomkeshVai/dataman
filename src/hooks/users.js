export const editusers = async (itemData, id) => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/edit/users/${id}`,
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

// Delete a user
export const deleteuser = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  });
  const result = await response.json();
  return result;
};

// save a user to database
export const saveUser = (user) => {
  const currentUser = {
    email: user.email,
    name: user.name,
  };

  fetch(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  }).then((res) => res.json());
};

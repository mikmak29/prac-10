const fetchUsers = async (route) => {
  try {
    const response = await fetch(`http://localhost:8000/api/user${route}`);

    if (!response.ok) {
      throw new Error("Couldn't fetch data.");
    }

    const data = await response.json();
    console.log(data);
  } catch (err) {
    throw new Error(err.message);
  }
};

fetchUsers("/data");

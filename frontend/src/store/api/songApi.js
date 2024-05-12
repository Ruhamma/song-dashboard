import axios from "axios";

const server = "http://localhost:5000/api/songs";

export const fetchSongs = async () => {
  try {
    const response = await axios.get(server);
    return response.data;
  } catch (err) {
    throw err;
  }
};


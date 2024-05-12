import axios from "axios";

const server = "http://localhost:5000/api/songs";

export const fetchSongsApi = async () => {
  try {
    const response = await axios.get(server);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const submitSong = async (songData) => {
  try {
    const response = await axios.post(server, songData);
    return response.data;
  } catch (err) {
    throw err;
  }
};

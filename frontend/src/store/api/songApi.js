import axios from "axios";

const server = "https://song-dashboard-zeta.vercel.app/api/songs";

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

export const deleteSong = async (songId) => {
  try {
    const response = await axios.delete(`${server}/${songId}`);
    console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const updateSong = async (songId, songData) => {
  try {
    const response = await axios.put(`${server}/${songId}`, songData);
    return response.data;
  } catch (err) {
    throw err;
  }
};

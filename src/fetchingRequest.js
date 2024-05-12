import axios from "axios";

const fetching = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "https://f41e-156-208-210-223.ngrok-free.app/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default fetching;


import axios from "axios";

const fetching = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL:
      "https://patients-management-system-production-6391.up.railway.app/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default fetching;

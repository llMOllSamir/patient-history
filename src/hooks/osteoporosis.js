import { useQuery } from "react-query";
import fetching from "../fetchingRequest";

/** fetching data to get general examination for patient using patient id */
export const useOsteoporosis = ({ id, onSuccess }) => {
  const fetchData = () => fetching().get(`/osteoporosis/${id}`);
  return useQuery("osteoporosis", fetchData, {
    onSuccess,
  });
};

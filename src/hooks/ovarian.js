import { useQuery } from "react-query";
import fetching from "../fetchingRequest";

/** fetching data to get general examination for patient using patient id */
export const useOvarianCancer = ({ id, onSuccess }) => {
  const fetchData = () => fetching().get(`/ovarian/${id}`);
  return useQuery("Breast Cancer", fetchData, {
    onSuccess,
  });
};

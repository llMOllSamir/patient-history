import { useQuery } from "react-query";
import fetching from "../fetchingRequest";

/** fetching data to get general examination for patient using patient id */
export const useGetObstetrics = ({ id, onSuccess, onError }) => {
  const fetchData = () => fetching().get(`/obstetrics/${id}`);
  return useQuery("obstetrics", fetchData, {
    onSuccess,
    onError,
  });
};

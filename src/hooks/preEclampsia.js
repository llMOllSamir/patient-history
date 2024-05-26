import { useQuery } from "react-query";
import fetching from "../fetchingRequest";

/** fetching data to get useGetCervix for patient using patient id */
export const useGetPreEclampsia = ({ id, onSuccess, onError }) => {
  const fetchData = () => fetching().get(`/pre-eclampsia/${id}`);
  return useQuery("pre-eclampsia", fetchData, {
    onSuccess,
    onError,
  });
};

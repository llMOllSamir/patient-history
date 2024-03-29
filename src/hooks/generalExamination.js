import { useQuery } from "react-query";
import fetching from "../fetchingRequest";

/** fetching data to get general examination for patient using patient id */
export const useGeneralExamination = ({ id, onSuccess, onError }) => {
  const fetchData = fetching().get(`/general-examination/${id}`);
  return useQuery("get general examination", fetchData, {
    onSuccess,
    onError,
  });
};

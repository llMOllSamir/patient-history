import { useQuery } from "react-query";
import fetching from "../fetchingRequest";

/** fetching data to get general examination for patient using patient id */
export const useSearchPatients = () => {
  const fetchData = () => fetching().get(`/patients/`);
  return useQuery("Search patients", fetchData);
};

import { useMutation, useQuery } from "react-query";
import fetching from "../fetchingRequest";

/** fetching data to get gynaecological for patient using patient id */
export const useGynecologicalHistory = ({ id, onSuccess }) => {
  const fetchData = () => fetching().get(`/gynaecological/${id}`);
  return useQuery("gynaecological", fetchData, {
    onSuccess,
  });
};

/** Mutate  to get AddGynecologicalHistory for patient using patient id */
export const useAddGynecologicalHistory = ({ id, onSuccess }) => {
  const fetchData = (data) => fetching().post(`/gynaecological`, data);
  return useMutation(fetchData, {
    onSuccess,
  });
};

/** Mutate  to get AddGynecologicalHistory for patient using patient id */
export const useUpdateGynecologicalHistory = ({ id, onSuccess }) => {
  const fetchData = (data) => fetching().put(`/gynaecological/${id}`, data);
  return useMutation(fetchData, {
    onSuccess,
  });
};
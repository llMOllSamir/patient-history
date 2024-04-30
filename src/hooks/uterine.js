import { useMutation, useQuery } from "react-query";
import fetching from "../fetchingRequest";

/** fetching data to get Uterine cancer examination for patient using patient id */
export const useGetUterineCancer = ({ id, onSuccess }) => {
  const fetchData = () => fetching().get(`/uterine/${id}`);
  return useQuery("Uterine Cancer", fetchData, {
    onSuccess,
  });
};

export const useGetMutateUterineCancer = ({ id, onGetSuccess }) => {
  const fetchData = () => fetching().get(`/uterine/${id}`);
  return useMutation(fetchData, {
    onSuccess: onGetSuccess,
  });
};

/** Mutate  to add Uterine cancer examination for patient*/
export const useAddUterine = ({ onSuccess }) => {
  const fetchData = (data) => fetching().post(`/uterine`, data);
  return useMutation(fetchData, {
    onSuccess,
  });
};

/** Mutate  to update Uterine cancer examination for patient using patient id */
export const useUpdateUterine = ({ id, onSuccess }) => {
  const fetchData = (data) => fetching().put(`/uterine/${id}`, data);
  return useMutation(fetchData, {
    onSuccess,
  });
};

import { useMutation, useQuery } from "react-query";
import fetching from "../fetchingRequest";

/** fetching data to get useGetCervix for patient using patient id */
export const useGetCervix = ({ id, onSuccess, onError }) => {
  const fetchData = () => fetching().get(`/cervix/${id}`);
  return useQuery("cervix", fetchData, {
    onSuccess,
    onError,
  });
};

// add Cervix
const sendData = (data) => fetching().post("/cervix", data);
export const useAddCervix = ({ onSuccess, onError }) =>
  useMutation(sendData, { onSuccess, onError });

// update Cervix
const updatedCervix = ({ data, id }) => fetching().put(`/cervix/${id}`, data);
export const useUpdateCervix = ({ onSuccess, onError }) =>
  useMutation(updatedCervix, { onSuccess, onError });

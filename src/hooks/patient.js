
import { useMutation, useQuery } from "react-query";
import fetching from "../fetchingRequest";

// get patient by code
export const useGetPatient = ({ code, onSuccess, onError }) => {
  const fetchPatient = () => {
    if (code.length === 14)
      return fetching().get(`/patients/get-patient/${code}`);

    return fetching().get(`/patients/search/${code}`);
  };

  return useQuery("get patient", fetchPatient, { onSuccess, onError });
};

// add patient
const sendData = (data) => fetching().post("/patients", data);
export const useAddPatient = ({ onSuccess, onError }) =>
  useMutation(sendData, { onSuccess, onError });

// update patient
const updated = ({ data, id }) => fetching().put(`/patients/${id}`, data);
export const useUpdatePatient = ({ onSuccess, onError }) =>
  useMutation(updated, { onSuccess, onError });

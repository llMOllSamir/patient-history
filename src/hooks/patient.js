import { useMutation, useQuery } from "react-query";
import fetching from "../fetchingRequest";

// get patient by code
export const useGetPatient = ({ code, onSuccess }) => {
  const fetchPatientByCode = () => fetching().get(`/patients/search/${code}`);

  return useQuery("get patient", fetchPatientByCode, { onSuccess });
};

// add patient
const sendData = (data) => fetching().post("/patients", data);
export const useAddPatient = ({ onSuccess }) =>
  useMutation(sendData, { onSuccess });

// update patient
const updated = ({ data, id }) => fetching().put(`/patients/${id}`, data);
export const useUpdatePatient = ({ onSuccess }) =>
  useMutation(updated, { onSuccess });

import { useMutation, useQuery } from "react-query";
import fetching from "../fetchingRequest";

export const useGetDoctors = ({ doctorsOnSuccess, doctorsOnError }) => {
  const fetchDoctors = () => fetching().get(`/doctors`);

  return useQuery({
    queryKey: "doctors",
    queryFn: fetchDoctors,
    onSuccess: doctorsOnSuccess,
    onError: doctorsOnError,
  });
};

export const useGetAdminActivities = ({
  id,
  adminActivitiesOnSuccess,
  adminActivitiesOnError,
}) => {
  const fetchAdminActivities = () => fetching().get(`/admins/${id}/history`);
  return useQuery({
    queryKey: "adminActivity",
    queryFn: fetchAdminActivities,
    onSuccess: adminActivitiesOnSuccess,
    onError: adminActivitiesOnError,
  });
};

const deleteDoctor = (id) => fetching().delete(`/doctors/${id}`);
export const useDeleteDoctor = ({ onSuccess }) => {
  return useMutation(deleteDoctor, { onSuccess });
};

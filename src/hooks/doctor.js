import { useQueries } from "react-query";
import fetching from "../fetchingRequest";

export const useGetDoctorsAndAdminActivities = ({ id }) => {
  const fetchDoctors = () => fetching().get(`/doctors`);
  const fetchAdminActivities = () => fetching().get(`/admins/${id}/history`);

  const queries = [
    {
      queryKey: "doctors",
      queryFn: fetchDoctors,
    },
    {
      queryKey: "adminActivities",
      queryFn: fetchAdminActivities,
    },
  ];

  return useQueries(queries);
};

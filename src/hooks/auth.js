import { useMutation, useQuery } from "react-query";
import fetching from "../fetchingRequest";

const login = (data) => fetching().post("/login", data);
const useLogin = ({ onSuccess, onError }) =>
  useMutation(login, {
    onSuccess,
    onError,
  });

const logOut = () => {
  fetching().delete("/logout");
};
const useLogout = ({ onSuccess }) =>
  useQuery("logout", logOut, {
    onSuccess,
    enabled: false,
  });

export { useLogin, useLogout };

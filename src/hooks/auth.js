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

const forgetPassword = (data) => fetching().post("/forgot-password", data);
const useForgotPassword = ({ onSuccess }) =>
  useMutation(forgetPassword, { onSuccess });

const resetPassword = (data) => fetching().post("/reset-password", data);
const useResetPassword = ({ onSuccess }) =>
  useMutation(resetPassword, { onSuccess });

export { useLogin, useLogout, useForgotPassword, useResetPassword };

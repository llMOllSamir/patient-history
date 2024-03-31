import React, { useCallback, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, setUserData } from "../../store/slices/authSlice";
import fetching from "../../fetchingRequest";
import { Helmet } from "react-helmet";

export default function Layout() {
  const { pathname } = useLocation();
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth)
  //  get user data
  const getUserData = useCallback(async () => {
    await fetching().get("/auth/user")
      .then(({ data }) => { dispatch(setUserData(data)) })
      .catch(err => { localStorage.removeItem("token") })
  }
    , [dispatch])

  //  handel window scroll 
  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);

  // get user data when token change
  useEffect(() => {
    if (token !== null) {
      getUserData(token)
    }
  }, [token, getUserData])

  // check token in local storage 
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(login(localStorage.getItem("token")))
    }
  }, [dispatch])

  return <>
    <Helmet>
      <title>
        وحدة أورام النساء بطب المنصورة
      </title>
    </Helmet>
    <Outlet />
  </>
}

import React, { useEffect } from "react";
import DashboredHeader from "../DashboredHeader/DashboredHeader";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

export default function RouteOutlet({ title = "", route = "" }) {
  const { pathname } = useLocation();
  // get patient data
  const { data } = useSelector((state) => state.patient);
  const navigate = useNavigate();

  useEffect(() => {
    if (data === null && pathname === `/patient/${route}`) {
      navigate("/patient/search");
    }
  }, [navigate, pathname, route, data]);

  return (
    <section className="grow">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <DashboredHeader />
      <h1 className="font-semibold text-3xl select-none px-10 my-10 text-fuchsia-800">
        {title}
      </h1>
      <Outlet />
    </section>
  );
}

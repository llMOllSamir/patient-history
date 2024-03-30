import React, { useEffect } from "react";
import DashboredHeader from "../DashboredHeader/DashboredHeader";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet";

export default function RouteOutlet({ title = "", route = "" }) {
  const { pathname } = useLocation();

  const { id } = useParams();
  // get patient data
  const { patientCode } = useSelector((state) => state.patient);
  const navigate = useNavigate();
  useEffect(() => {
    if (!id && !patientCode && !pathname.endsWith("new-patient")) {
      navigate("/");
    }
  }, [id, navigate, patientCode, pathname]);

  return (
    <section className="grow">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>
      <DashboredHeader />
      <h1 className="font-semibold text-3xl px-10 my-10 text-fuchsia-800">
        {title}
      </h1>
      <Outlet />
    </section>
  );
}

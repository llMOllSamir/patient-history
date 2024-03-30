import React, { useEffect } from "react";
import DashboredHeader from "../DashboredHeader/DashboredHeader";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate, patientCode]);

  return (
    <section className="grow">
      <DashboredHeader />
      <h1 className="font-semibold text-3xl px-10 my-10 text-fuchsia-800">
        {title}
      </h1>
      <Outlet />
      {/* {pathname.endsWith(route)  ? <FixedRoute route={route} /> : <Outlet />} */}
    </section>
  );
}

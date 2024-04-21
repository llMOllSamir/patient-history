import React, { useEffect, useState } from "react";
import LoadingPatient from "../../LoadingPatient";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDoctorHistory } from "../../store/slices/history";
import Visit from "./PatientVisit";
import { PatientVisit } from "./PatientVisitItem";
import { IoHomeOutline } from "react-icons/io5";

function DoctorHistory() {
  const { id } = useParams();
  const [indexVisit, setIndexVisit] = useState(0);
  const dispatech = useDispatch();
  const { history, loading, error } = useSelector((state) => state.history);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatech(getDoctorHistory({ id: Number(id) }));
  }, [dispatech, id]);

  if (loading) {
    return <LoadingPatient />;
  }

  if (error) {
    return (
      <div className="mx-4  text-center h-1/2 items-center justify-center   flex flex-col gap-5  ">
        <h2 className="font-bold text-red-500 text-3xl">{error.data.error}</h2>
      </div>
    );
  }

  if (indexVisit) {
    return (
      <>
        <Visit
          data={history[indexVisit - 1]}
          setIndex={setIndexVisit}
          type={"patient"}
        />
      </>
    );
  }
  if (history && history.length) {
    return (
      <div className="flex flex-col px-12 max-md:px-5 pb-20 bg-white">
        <main className="flex flex-col px-12 gap-3 mt-6 w-full max-md:px-5 max-md:max-w-full">
          <header className="flex gap-5 px-14 py-8 w-full text-white bg-fuchsia-900 rounded-lg max-md:flex-wrap max-md:px-5 max-md:max-w-full">
            <h1 className="flex-auto text-3xl font-medium capitalize">
              "DR.{user.name}" history
            </h1>
            <Link
              to="/"
              className="flex items-center gap-2 bg-fuchsia-700 px-5 py-2 text-lg font-semibold rounded-lg hover:bg-fuchsia-800"
            >
              <IoHomeOutline />
              Home
            </Link>
          </header>
          <section className="flex flex-col items-center px-14 pt-5 pb-10 text-black rounded bg-zinc-100 max-md:px-5 max-md:max-w-full">
            <div className="flex self-start w-full text-lg font-semibold whitespace-nowrap text-neutral-500  max-md:flex-wrap">
              <div className=" pl-10 flex-auto">Date</div>
              <div className="flex-auto">Patient</div>
            </div>
            {history.map((visit, index) => (
              <PatientVisit
                key={index}
                {...visit}
                index={index + 1}
                setIndex={setIndexVisit}
                type={"patient"}
              />
            ))}
          </section>
        </main>
      </div>
    );
  } else {
    return (
      <h2 className="font-bold text-red-500 text-3xl capitalize text-center">
        No history for this doctor
      </h2>
    );
  }
}

export default DoctorHistory;

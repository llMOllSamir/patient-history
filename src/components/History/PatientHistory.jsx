import React, { useEffect, useState } from "react";
import LoadingPatient from "../../LoadingPatient";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPatientHistory } from "../../store/slices/history";
import Visit from "./PatientVisit";
import { PatientVisit } from "./PatientVisitItem";

function PatientHistory() {
  const { id } = useParams();
  const [indexVisit, setIndexVisit] = useState(0);
  const dispatech = useDispatch();
  const { history, loading, error } = useSelector((state) => state.history);
  useEffect(() => {
    dispatech(getPatientHistory({ id: Number(id) }));
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
          type={"doctor"}
        />
      </>
    );
  }

  if (history && history.length) {
    return (
      <div className="flex flex-col pb-20 bg-white">
        <main className="flex flex-col px-12 mt-6 w-full max-md:px-5 max-md:max-w-full">
          <section className="flex flex-col items-center px-14 pt-5 pb-10 text-black rounded bg-zinc-100 max-md:px-5 max-md:max-w-full">
            <div className="flex self-start w-full text-lg font-semibold whitespace-nowrap text-neutral-500  max-md:flex-wrap">
              <div className="flex-auto">Date</div>
              <div className="flex-auto">Doctor</div>
            </div>
            {history.map((visit, index) => (
              <PatientVisit
                key={index}
                {...visit}
                index={index + 1}
                setIndex={setIndexVisit}
                type={"doctor"}
              />
            ))}
          </section>
        </main>
      </div>
    );
  } else {
    return (
      <h2 className="font-bold text-red-500 text-3xl capitalize text-center">
        No history for this patient
      </h2>
    );
  }
}

export default PatientHistory;

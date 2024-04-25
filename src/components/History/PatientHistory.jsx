import React, { useEffect, useState } from "react";
import LoadingPatient from "../../LoadingPatient";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getHistory } from "../../store/slices/patientHistory";
import Visit from "./PatientVisit";

function PatientHistory() {
  const { id } = useParams();
  const [indexVisit, setIndexVisit] = useState(0);
  const dispatech = useDispatch();
  const { history, loading, error } = useSelector(
    (state) => state.patientHistory
  );
  useEffect(() => {
    dispatech(getHistory({ id: Number(id) }));
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
        <Visit data={history[indexVisit - 1]} setIndex={setIndexVisit} />
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

function PatientVisit({ date, doctor_name, index, setIndex }) {
  return (
    <div className="flex gap-5 mt-5 w-full max-w-[1147px] max-md:flex-wrap max-md:max-w-full ">
      <div className="flex flex-auto gap-5 px-3 py-5 justify-between items-center bg-white shadow-sm max-md:flex-wrap max-md:px-5 max-md:max-w-full rounded">
        <div className="text-xl">{date}</div>
        <div className="my-auto text-xl capitalize">DR.{doctor_name}</div>
        <button
          className="justify-center self-start px-5 py-1.5 text-base font-medium leading-5 text-center text-white bg-blue-600 rounded-md border-2 border-blue-600 border-solid max-md:px-5"
          onClick={() => setIndex(index)}
        >
          View Data
        </button>
      </div>
    </div>
  );
}

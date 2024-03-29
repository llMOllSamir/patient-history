import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LoadingPatient from "../../LoadingPatient";
import { FiDownload } from "react-icons/fi";
import { MdAdd, MdEdit } from "react-icons/md";
import { setPatientId } from "../../store/slices/patientSlice";
import { getObstetrics } from "../../store/slices/obstetricsSlice";

export default function PatientObstetricsHistory() {
  const { id } = useParams();
  const dispatech = useDispatch();
  const { obstetrics, loading, error } = useSelector(
    (state) => state.obstetrics
  );

  useEffect(() => {
    dispatech(getObstetrics({ id: Number(id) })).then((res) => {
      if (res.payload.id) {
        dispatech(setPatientId({ id: Number(res.payload.patient_id) }));
      }
    });
  }, [dispatech, id]);

  if (loading) {
    return <LoadingPatient />;
  }

  if (error) {
    return (
      <div className="mx-4  text-center h-1/2 items-center justify-center   flex flex-col gap-5  ">
        <h2 className="font-bold text-red-500 text-3xl">{error.data.error}</h2>
        <Link
          to={"/patient/obstetrics-history/add"}
          className="bg-fuchsia-900 text-lg px-3 text-white rounded-lg py-2"
        >
          Add New Obstetric Examination
        </Link>
      </div>
    );
  }

  if (obstetrics) {
    return (
      <>
        <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
          <ArticalInfo description={obstetrics.gravidity} title={"gravidity"} />

          <ArticalInfo description={obstetrics.parity} title={"parity"} />

          <ArticalInfo description={obstetrics.abortion} title={"abortion"} />

          <ArticalInfo col={2} description={obstetrics.notes} title={"notes"} />
        </div>
        <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">
          <Link
            to={`/patient/obstetrics-history/add/`}
            className="rounded-lg text-white bg-blue-700 flex gap-4 px-10 py-2"
          >
            <MdAdd />
            Add
          </Link>
          <Link
            to={`/patient/obstetrics-history/update/${obstetrics.patient_id}`}
            className="rounded-lg text-white bg-blue-700 flex gap-4 px-10 py-2"
          >
            <MdEdit />
            Edit
          </Link>
          <button
            className="rounded-lg text-white bg-fuchsia-900 flex gap-4 px-10 py-2"
            onClick={() => {
              window.print();
            }}
          >
            <FiDownload />
            Download a copy
          </button>
        </div>
      </>
    );
  }
}

const ArticalInfo = ({ title, description, col, phone = null }) => {
  return (
    <article
      className={`flex flex-col font-medium capitalize ${
        col && `md:col-span-${col}`
      }`}
    >
      <h3 className=" text-black   text-xl">{title || ""}</h3>
      {phone ? (
        <a
          className=" text-gray-600 text-base w-fit"
          href={`tel:${description}`}
        >
          {description || ""}
        </a>
      ) : (
        <p className=" text-gray-600 text-base">{description || ""}</p>
      )}
    </article>
  );
};

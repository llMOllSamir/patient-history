import React from "react";
import styles from "./GeneralExamination.module.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getGeneralExamination } from "../../store/slices/generalExaminationSlice";
import LoadingPatient from "../../LoadingPatient";
import { FiDownload } from "react-icons/fi";
import { MdAdd, MdEdit } from "react-icons/md";
import { setPatientId } from "../../store/slices/patientSlice";

export default function GeneralExamination() {
  const { id } = useParams();
  const dispatech = useDispatch();
  const { generalExamination, loading, error } = useSelector(
    (state) => state.generalExamination
  );

  useEffect(() => {
    dispatech(getGeneralExamination({ id: Number(id) })).then((res) => {
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
        <h2 className="font-bold text-red-500 text-3xl">
          {error.response.error}
        </h2>
        <Link
          to={"/patient/personal-information"}
          className="bg-fuchsia-900 text-lg px-3 text-white rounded-lg py-2"
        >
          Search With Code
        </Link>
      </div>
    );
  }

  if (generalExamination) {
    return (
      <>
        <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
          <ArticalInfo
            description={generalExamination.height}
            title={"height(cm)"}
          />

          <ArticalInfo description={generalExamination.pulse} title={"pulse"} />

          <ArticalInfo
            description={generalExamination.weight}
            title={"wight"}
          />

          <ArticalInfo
            description={generalExamination.random_blood_sugar}
            title={"random blood sugar"}
          />

          <ArticalInfo
            description={generalExamination.blood_pressure}
            title={"blood pressure"}
          />
        </div>
        <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">
          <Link
            to={`/patient/General-examination/add/`}
            className="rounded-lg text-white bg-blue-700 flex gap-4 px-10 py-2"
          >
            <MdAdd />
            Add
          </Link>
          <Link
            to={`/patient/General-examination/update/${generalExamination.patient_id}`}
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

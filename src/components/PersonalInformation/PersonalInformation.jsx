import React, { useEffect } from "react";
import styles from "./PersonalInformation.module.css";
import { MdEdit } from "react-icons/md";
import { FiDownload } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetPatient } from "../../hooks/patient";
import LoadingPatient from "../../LoadingPatient";
import { useDispatch, useSelector } from "react-redux";
import {
  emptyPatientCode,
  fixPatientCode,
  setPatientData,
  setPatientId,
} from "../../store/slices/patientSlice";

export default function PersonalInformation() {
  const { id } = useParams();
  const dispatech = useDispatch();
  // get patient data
  const { data, patientCode } = useSelector((state) => state.patient);
  const { user } = useSelector((state) => state.auth);

  // fetch data success
  const onSuccess = (data) => {
    dispatech(fixPatientCode(data.data.patient_code));
    dispatech(setPatientData(data.data));
    dispatech(setPatientId({ id: data.data.id }));
  };
  const onError = (error) => {
    dispatech(setPatientData(null));
    dispatech(fixPatientCode(null));
  }
  const { isLoading, error, isError } = useGetPatient({
    code: id || patientCode,
    onSuccess,
    onError
  });

  if (isLoading) {
    return <LoadingPatient />;
  }
  if (isError) {
    return (
      <div className="mx-4  text-center h-1/2 items-center justify-center   flex flex-col gap-5  ">
        <h2 className="font-bold text-red-500 text-3xl">
          {error.response.data.error}
        </h2>
        <Link
          onClick={() => {
            dispatech(emptyPatientCode());
          }}
          to={"/patient/personal-information"}
          className="bg-fuchsia-900 text-lg px-3 text-white rounded-lg py-2"
        >
          Search With Code
        </Link>
      </div>
    );
  }

  if (data)
    return (
      <React.Fragment>
        <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
          <ArticalInfo col={2} description={data.name} title={"name"} />

          <ArticalInfo description={data.national_id} title={"National ID"} />

          <ArticalInfo description={data.patient_code} title={"code"} />

          <ArticalInfo
            description={data.date_of_birth}
            title={"Date of birth"}
          />

          <ArticalInfo description={data.age} title={"age"} />

          <ArticalInfo
            description={data.marital_state}
            title={"Marital status"}
          />

          <ArticalInfo description={data.address} title={"Address"} />

          <h2 className="text-fuchsia-900 my-10 text-2xl font-semibold md:col-span-2">
            Contact Information
          </h2>

          <ArticalInfo
            description={data.phone_number}
            phone={true}
            title={"Phone number"}
          />

          <ArticalInfo
            description={data.email || "Not Found"}
            title={"E-mail"}
          />

          <ArticalInfo
            description={data.relative_phone}
            phone={true}
            title={"Home number"}
          />
          <ArticalInfo
            description={data.relative_name}
            title={"Relative name"}
          />
        </div>
        <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">
          {user && user.role === "doctor" && <Link
            to={`/patient/personal-information/update-patient/${data.patient_code}`}
            className="rounded-lg text-white bg-blue-700 flex gap-4 px-10 py-2"
          >
            <MdEdit />
            Edit
          </Link>}
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
      </React.Fragment>
    );
}

const ArticalInfo = ({ title, description, col, phone = null }) => {
  return (
    <article
      className={`flex flex-col font-medium capitalize ${col && `md:col-span-${col}`
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

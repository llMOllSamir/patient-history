
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingPatient from "../../LoadingPatient";
import { FiDownload } from "react-icons/fi";
import { MdAdd, MdEdit } from "react-icons/md";
import { useGetObstetrics } from "../../hooks/obstetrics";
import { setObstetrics } from "../../store/slices/obstetricsSlice";
import NoDataFound from "../NoDataFound/NoDataFound";

export default function PatientObstetricsHistory() {
  const dispatech = useDispatch();
  const { data: patienData } = useSelector(state => state.patient)
  const { user } = useSelector(state => state.auth)

  const onSuccess = (data) => {
    dispatech(setObstetrics(data.data))
  }
  const onError = () => { }
  const { data, isLoading, isError, error } = useGetObstetrics({ id: patienData.id, onError, onSuccess })


  if (isLoading) {
    return <LoadingPatient />;
  }

  if (isError) {
    return (
      <div className="mx-4  text-center h-1/2 items-center justify-center   flex flex-col gap-5  ">
        <h2 className="font-bold text-red-500 text-lg  md:text-3xl">{error.response.data.error}</h2>
        <Link
          to={"/patient/obstetrics-history/add"}
          className="bg-fuchsia-900  text-sm md:text-lg px-3 text-white rounded-lg py-2 flex items-center gap-2"
        >
          <MdAdd />  New Obstetric Examination
        </Link>
      </div>
    );
  }



  if (data?.data && Object.keys(data?.data).length === 0) {
    return <NoDataFound link="obstetrics-history" title="obstetrics history" />
  }


  if (data?.data && Object.keys(data?.data).length > 0) {
    return (
      <>
        <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
          <ArticalInfo description={data.data.gravidity} title={"gravidity"} />

          <ArticalInfo description={data.data.parity} title={"parity"} />

          <ArticalInfo description={data.data.abortion} title={"abortion"} />

          <ArticalInfo col={2} description={data.data.notes} title={"notes"} />
        </div>
        <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">

          {user && user.role === "doctor" && <Link
            to={`/patient/obstetrics-history/update`}
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
      </>
    );
  }
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

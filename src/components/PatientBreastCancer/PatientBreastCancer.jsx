import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoadingPatient from "../../LoadingPatient";
import { FiDownload } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { useBreastCancer } from "../../hooks/breast";
import { setBreastData } from "../../store/slices/breastSlice";
import NoDataFound from "../NoDataFound/NoDataFound";

export default function PatientBreastCancerHistory() {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { data: patient } = useSelector((state) => state.patient);

  const onSuccess = (data) => {
    dispatch(setBreastData(data.data))
  }

  const { isLoading, isError, error, data } = useBreastCancer({ id: patient?.id, onSuccess })


  if (isLoading) {
    return <LoadingPatient />;
  }

  if (isError) {
    return (
      <div className="mx-4  text-center h-1/2 items-center justify-center   flex flex-col gap-5  ">
        <h2 className="font-bold text-red-500 text-3xl">{error.response.data.error}</h2>
        <Link
          to={"/patient/breast/add"}
          className="bg-fuchsia-900 text-lg px-3 text-white rounded-lg py-2"
        >
          Add New Breast Cancer Examination
        </Link>
      </div>
    );
  }


  if (data.data && Object.keys(data.data).length === 0) {
    return <NoDataFound link="breast" title="breast Cancer" />
  }

  if (data.data && Object.keys(data.data).length > 0) {
    return (
      <>
        <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
          <ArticalInfo description={data?.data?.age} title={"age"} />

          <ArticalInfo
            description={data?.data?.family_history}
            title={"family history"}
          />

          <ArticalInfo
            col={2}
            description={data?.data?.recommendations}
            title={"recommendations"}
          />
        </div>
        <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">
          {user && user.role === "doctor" &&
            <Link
              to={`/patient/breast/update`}
              className="rounded-lg text-white bg-blue-700 flex gap-4 px-10 py-2"
            >
              <MdEdit />
              Edit
            </Link>

          }


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

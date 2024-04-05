import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setGenralExamination } from "../../store/slices/generalExaminationSlice";
import LoadingPatient from "../../LoadingPatient";
import { FiDownload } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { useGeneralExamination } from "../../hooks/generalExamination";

export default function GeneralExamination() {
  const { id } = useParams();
  const dispatech = useDispatch();
  const onSuccess = (data) => { dispatech(setGenralExamination(data.data)) }
  const onError = (error) => { }
  const { isLoading, isError, data: examination, error: errData } = useGeneralExamination({ id, onError, onSuccess })
  const { user } = useSelector(state => state.auth)


  if (isLoading) {
    return <LoadingPatient />;
  }

  if (isError) {
    return (
      <div className="mx-4  text-center h-1/2 items-center justify-center   flex flex-col gap-5  ">
        <h2 className="font-bold text-red-500 text-lg md:text-3xl">{errData.response.data.error}</h2>
        <Link
          to={"/patient/General-examination/add"}
          className="bg-fuchsia-900 text-sm md:text-lg px-3 text-white rounded-lg py-2 flex gap-3 items-center"
        >
          <MdEdit />   New Examination
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
        <ArticalInfo
          description={examination?.data.height}
          title={"height(cm)"}
        />

        <ArticalInfo description={examination?.data.pulse} title={"pulse"} />

        <ArticalInfo
          description={examination?.data.weight}
          title={"wight"}
        />

        <ArticalInfo
          description={examination?.data.random_blood_sugar}
          title={"random blood sugar"}
        />

        <ArticalInfo
          description={examination?.data.blood_pressure}
          title={"blood pressure"}
        />
      </div>
      <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">
        {user && user.role === "doctor" &&
          <Link
            to={`/patient/General-examination/update`}
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

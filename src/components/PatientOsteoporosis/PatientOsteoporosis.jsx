
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingPatient from "../../LoadingPatient";
import { FiDownload } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { useOsteoporosis } from "../../hooks/osteoporosis";
import { setOsteoporosis } from "../../store/slices/osteoporosisSlice";
import NoDataFound from "../NoDataFound/NoDataFound";

export default function PatientOsteoporosisHistory() {
  const { id } = useParams();
  const dispatech = useDispatch();
  const { osteoporosis } = useSelector((state) => state.osteoporosis);
  const { user } = useSelector((state) => state.auth);

  const onSuccess = (data) => {
    dispatech(setOsteoporosis(data.data))
  }

  const { isError, isLoading, error } = useOsteoporosis({ id, onSuccess })





  if (isLoading) {
    return <LoadingPatient />;
  }

  if (isError) {
    return (
      <div className="mx-4  text-center h-1/2 items-center justify-center   flex flex-col gap-5  ">
        <h2 className="font-bold text-red-500 text-lg md:text-3xl">{error.response.data.error}</h2>
        <Link
          to={"/patient/Osteoporosis/add"}
          className="bg-fuchsia-900 text-sm md:text-lg px-3 text-white rounded-lg py-2"
        >
          Add New Osteoporosis Examination
        </Link>
      </div>
    );
  }

  if (osteoporosis && Object.keys(osteoporosis).length === 0) {
    return <NoDataFound link="osteoporosis" title="osteoporosis" />
  }

  if (osteoporosis && Object.keys(osteoporosis).length > 0) {
    return <>
      <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
        <ArticalInfo description={osteoporosis?.age} title={"age"} />

        <ArticalInfo description={osteoporosis?.weight} title={"weight"} />

        <ArticalInfo
          description={osteoporosis?.current_oestrogen_use ? "yes" : "no"}
          title={"current oestrogen use"}
        />

        <ArticalInfo
          col={2}
          description={osteoporosis?.recommendations}
          title={"recommendations"}
        />
      </div>
      <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">

        {user?.role === "doctor" &&
          <Link
            to={`/patient/Osteoporosis/update`}
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

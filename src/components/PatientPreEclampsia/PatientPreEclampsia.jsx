
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingPatient from "../../LoadingPatient";
import { FiDownload } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import { setPreEclampsia } from "../../store/slices/preEclampsiaSlice";
import NoDataFound from "../NoDataFound/NoDataFound";
import { useGetPreEclampsia } from "../../hooks/preEclampsia";

export default function PatientPreEclampsia() {
  const { id } = useParams();
  const dispatech = useDispatch();
  const { preEclampsia } = useSelector(
    (state) => state.preEclampsia
  );
  const { user } = useSelector((state) => state.auth);
  const onError = (error) => { console.log(error); }
  const onSuccess = (data) => {
    dispatech(setPreEclampsia(data.data))
  }
  const { error, isError, isLoading } = useGetPreEclampsia({ id, onError, onSuccess })



  if (isLoading) {
    return <LoadingPatient />;
  }

  if (isError) {
    return (
      <div className="mx-4  text-center h-1/2 items-center justify-center   flex flex-col gap-5  ">
        <h2 className="font-bold text-red-500 text-3xl">{error.data.error}</h2>
        <Link
          to={"/patient/Pre-eclampsia/add"}
          className="bg-fuchsia-900 text-lg px-3 text-white rounded-lg py-2"
        >
          Add New Pre-Eclamipa Examination
        </Link>
      </div>
    );
  }




  if (preEclampsia && Object.keys(preEclampsia).length === 0) {
    return <NoDataFound link="Pre-eclampsia" title="Pre eclampsia" />
  }

  if (preEclampsia && Object.keys(preEclampsia).length > 0) {

    if (preEclampsia) {
      return (
        <>
          <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
            <ArticalInfo
              description={
                preEclampsia["history_of_pre-eclampsia"] ? "yes" : "no"
              }
              title={"history of pre-eclampsia"}
            />

            <ArticalInfo
              description={preEclampsia.number_of_pregnancies_with_pe}
              title={"number of pregnancies with pe"}
            />

            {preEclampsia.date_of_pregnancies_with_pe &&
              typeof preEclampsia.date_of_pregnancies_with_pe === "object"
              ? preEclampsia.date_of_pregnancies_with_pe.map((date, index) => {
                if (date) {
                  return (
                    <ArticalInfo
                      key={index}
                      description={date}
                      title={`date of pregnancies with pe #${index + 1}`}
                    />
                  );
                }
              })
              : null}

            <ArticalInfo
              description={preEclampsia.fate_of_the_pregnancy}
              title={"fate of the pregnancy"}
            />
          </div>
          <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">
            {

              (user?.role === "doctor" || user?.role === "admin") && <Link
                to={`/patient/Pre-eclampsia/update`}
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

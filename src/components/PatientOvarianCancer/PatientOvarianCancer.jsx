import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LoadingPatient from "../../LoadingPatient";
import { FiDownload } from "react-icons/fi";
import { MdAdd, MdEdit } from "react-icons/md";
import { setPatientId } from "../../store/slices/patientSlice";
import { getOvarian } from "../../store/slices/ovarianSlice";

export default function PatientOvarianCancerHistory() {
  const { id } = useParams();
  const dispatech = useDispatch();
  const { ovarian, loading, error } = useSelector((state) => state.ovarian);

  useEffect(() => {
    dispatech(getOvarian({ id: Number(id) })).then((res) => {
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

  if (ovarian) {
    return (
      <>
        <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
          <ArticalInfo
            description={ovarian.breast_cancer_history ? "yes" : "no"}
            title={"Do you have a personal history of breast cancer?"}
            col={2}
          />

          <ArticalInfo
            description={ovarian.relatives_with_ovarian_cancer ? "yes" : "no"}
            title={"Do you have one or more relatives with ovarian cancer?"}
            col={2}
          />

          <ArticalInfo
            description={ovarian.gene_mutation_or_lynch_syndrome ? "yes" : "no"}
            title={
              "Do you have the BRCA1 or BRCA2 gene mutation or Lynch syndrome - hereditary nonpolyposis colorectal cancer (HNPCC)?"
            }
            col={2}
          />

          <ArticalInfo
            description={ovarian.recommendations}
            title={"recommendations"}
            col={2}
          />

          <table className="w-full text-md bg-white shadow-md mb-4 col-span-2 md:col-span-1">
            <tbody>
              <tr className="border-b">
                <th></th>
                <th className="text-left p-3 px-5 border-b border-l border-blue-900 border-solid bg-neutral-200 border-t">
                  Result
                </th>
                <th className="text-left p-3 px-5 border-b border-l border-blue-900 border-solid bg-neutral-200 border-r border-t">
                  Comments
                </th>
              </tr>
              <tr className=" bg-fuchsia-50 border-r border-b border-l border-blue-900 border-solid">
                <th className="p-3 px-5 border-b border-l border-blue-900 border-solid bg-neutral-200 border-t border-r text-xl">
                  TVS
                </th>
                <td className="p-3 px-5 border-blue-900 border-solid border-r">
                  {ovarian.tvs_result || ""}
                </td>
                <td className="p-3 px-5">{ovarian.tvs_comment || ""}</td>
              </tr>
              <tr className="bg-fuchsia-50 border-r border-b border-l border-blue-900 border-solid">
                <th className="p-3 px-5 border-b border-l border-r border-blue-900 border-solid bg-neutral-200  text-xl">
                  CA-125
                </th>
                <td className="p-3 px-5 border-blue-900 border-solid border-r">
                  {ovarian["ca-125_result"] || ""}
                </td>
                <td className="p-3 px-5">{ovarian["ca-125_comment"] || ""}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">
          <Link
            to={`/patient/ovarian/add/`}
            className="rounded-lg text-white bg-blue-700 flex gap-4 px-10 py-2"
          >
            <MdAdd />
            Add
          </Link>
          <Link
            to={`/patient/ovarian/update/${ovarian.patient_id}`}
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

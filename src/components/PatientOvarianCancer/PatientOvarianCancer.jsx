import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./PatientOvarianCancer.module.css"
import { useDispatch, useSelector } from "react-redux";
import LoadingPatient from "../../LoadingPatient";
import { FiDownload } from "react-icons/fi";
import { MdAdd, MdEdit } from "react-icons/md";
import { useOvarianCancer } from "../../hooks/ovarian";
import { setOvarian } from "../../store/slices/ovarianSlice";
import NoDataFound from "../NoDataFound/NoDataFound";

export default function PatientOvarianCancerHistory() {
  const { id } = useParams();
  const dispatech = useDispatch();
  const { ovarian } = useSelector((state) => state.ovarian);
  const { user } = useSelector(state => state.auth)
  const onSuccess = (values) => {
    dispatech(setOvarian(values.data))
  }
  const { isLoading, error, isError } = useOvarianCancer({ id, onSuccess })


  if (isLoading) {
    return <LoadingPatient />;
  }

  if (isError) {
    return (
      <div className="mx-4  text-center h-1/2 items-center justify-center   flex flex-col gap-5  ">
        <h2 className="font-bold text-red-500 text-3xl">{error.response.data.error}</h2>
        <Link
          to={"/patient/ovarian/add"}
          className="bg-fuchsia-900 text-lg px-3 text-white rounded-lg py-2"
        >
          Add New Ovary Cancer Examination
        </Link>
      </div>
    );
  }

  if (ovarian && Object.keys(ovarian).length === 0) {
    return <NoDataFound link="ovarian" title="ovarian Cancer" />
  }

  if (ovarian && Object.keys(ovarian).length > 0) {
    if (ovarian) {
      return (
        <>

          <div className="select-none capitalize  px-2 md:px-10" >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className=" flex flex-col gap-5 ">

                <div>
                  <p>Do you have a personal history of
                    breast cancer?</p>
                  <div className="   rounded-lg p-2 xl:w-1/2 mt-2 ">
                    <label htmlFor="historyYes" className="flex gap-4">
                      <input name="breast_cancer_history" className={`${styles.shadow}`} id="historyYes" type="radio" checked={ovarian.breast_cancer_history === 1} readOnly /> yes
                    </label>
                    <label htmlFor="historyNo" className="flex gap-4">
                      <input name="breast_cancer_history" className={`${styles.shadow}`} id="historyNo" type="radio" checked={ovarian.breast_cancer_history === 0} readOnly /> no
                    </label>
                  </div>
                </div>

                <div>
                  <p>Do you have one or more relatives with
                    ovarian cancer?</p>
                  <div className="  rounded-lg p-2 xl:w-1/2 mt-2 ">
                    <label htmlFor="relativeYes" className="flex gap-4">
                      <input name="relatives_with_ovarian_cancer" className={`${styles.shadow}`} id="relativeYes" checked={ovarian.relatives_with_ovarian_cancer === 1} readOnly type="radio" value={true} /> yes
                    </label>
                    <label htmlFor="relativeNo" className="flex gap-4">
                      <input name="relatives_with_ovarian_cancer" className={`${styles.shadow}`} id="relativeNo" checked={ovarian.relatives_with_ovarian_cancer === 0} readOnly type="radio" value={false} /> no
                    </label>
                  </div>
                </div>

                <div>
                  <p>Do you have the BRCA1 or BRCA2 gene mutation
                    or Lynch syndrome - hereditary nonpolyposis
                    colorectal cancer (HNPCC)? </p>
                  <div className="  rounded-lg p-2 xl:w-1/2 mt-2 ">
                    <label htmlFor="geneYes" className="flex gap-4">
                      <input name="gene_mutation_or_lynch_syndrome" className={`${styles.shadow}`} id="geneYes" checked={ovarian.gene_mutation_or_lynch_syndrome === 1} readOnly type="radio" value={true} /> yes
                    </label>
                    <label htmlFor="geneNo" className="flex gap-4">
                      <input name="gene_mutation_or_lynch_syndrome" className={`${styles.shadow}`} id="geneNo" checked={ovarian.gene_mutation_or_lynch_syndrome === 0} readOnly type="radio" value={false} /> no
                    </label>
                    <label htmlFor="geneNull" className="flex gap-4">
                      <input name="gene_mutation_or_lynch_syndrome" className={`${styles.shadow}`} id="geneNull" checked={ovarian.gene_mutation_or_lynch_syndrome === null} readOnly type="radio" value={null} /> Don’t know
                    </label>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 md:col-span-2 flex-col flex gap-8">
                <div className="w-full   overflow-auto">
                  <table  >
                    <tr  >
                      <th></th>
                      <th className="bg-gray-300 border-2 border-blue-700 border-opacity-35 px-5">Result</th>
                      <th className="bg-gray-300 border-2 border-blue-700 border-opacity-35 px-5">Comments</th>
                    </tr>
                    <tr  >
                      <th className="bg-gray-300 px-5 border-2 border-blue-700 border-opacity-35">TVS</th>
                      <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                        <input
                          name="tvs_result" className="outline-none bg-transparent  px-5" type="text" value={ovarian.tvs_result} readOnly />
                      </td>
                      <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35" >
                        <input
                          name="tvs_comment" className="outline-none bg-transparent  px-5" type="text" value={ovarian.tvs_comment} readOnly />
                      </td>
                    </tr>
                    <tr >
                      <th className="bg-gray-300 px-5 border-2 border-blue-700 border-opacity-35">CA-125</th>
                      <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                        <input
                          name="ca-125_result" className="outline-none bg-transparent  px-5" type="text" value={ovarian["ca-125_result"]} readOnly />
                      </td>
                      <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                        <input
                          name="ca-125_comment" className="outline-none  bg-transparent px-5" type="text" value={ovarian["ca-125_comment"]} readOnly />
                      </td>
                    </tr>
                  </table>
                </div>


                <div className="flex flex-col gap-2 ">
                  <label htmlFor="recommendations">Recommendations</label>
                  <textarea
                    name="recommendations"
                    id="recommendations"
                    readOnly
                    value={ovarian.recommendations}
                    className="border-2 p-2 outline-none border-gray-600 border-opacity-40 md:w-1/2 resize-none placeholder:text-gray-500 placeholder:text-opacity-40"
                    placeholder="Write Your Recommendations"
                    cols="30" rows="10"></textarea>
                </div>

              </div>
            </div>
          </div>

          <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">

            {(user?.role === "doctor" || user?.role === "admin") && <Link
              to={`/patient/ovarian/update`}
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

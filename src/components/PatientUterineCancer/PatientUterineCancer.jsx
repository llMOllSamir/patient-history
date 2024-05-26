
import React from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./PatientUterineCancer.module.css";
import { useDispatch, useSelector } from "react-redux";
import LoadingPatient from "../../LoadingPatient";
import { FiDownload } from "react-icons/fi";
import { MdAdd, MdEdit } from "react-icons/md";
import { useGetUterineCancer } from "../../hooks/uterine";
import { setUterine } from "../../store/slices/uterineSlice";
import NoDataFound from "../NoDataFound/NoDataFound";

export default function PatientUterineCancer() {
  const { id } = useParams();
  const dispatech = useDispatch();
  const { uterine } = useSelector((state) => state.uterine);
  const { user } = useSelector((state) => state.auth);
  const onSuccess = (values) => {
    dispatech(setUterine(values.data));
  };
  const { isLoading, error, isError } = useGetUterineCancer({ id, onSuccess });

  if (isLoading) {
    return <LoadingPatient />;
  }

  if (isError) {
    return (
      <div className="mx-4  text-center h-1/2 items-center justify-center  flex flex-col gap-5  ">
        <h2 className="font-bold text-red-500 text-3xl">
          {error.response.data.error}
        </h2>
        <Link
          to={"/patient/uterine/add"}
          className="bg-fuchsia-900 text-lg px-3 text-white rounded-lg py-2"
        >
          Add New Uterine Cancer Examination
        </Link>
      </div>
    );
  }

  if (uterine && Object.keys(uterine).length === 0) {
    return <NoDataFound link="uterine" title="uterine Cancer" />;
  }

  if (uterine && Object.keys(uterine).length > 0) {
    if (uterine) {
      return (
        <>
          <div className="select-none capitalize  px-2 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className=" flex flex-col gap-5 ">
                <div>
                  <p>Lynch Syndrome</p>
                  <div className="   rounded-lg p-2 xl:w-1/2 mt-2 ">
                    <label htmlFor="LynchSyndromePiv" className="flex gap-4">
                      <input
                        name="LynchSyndrome"
                        className={`${styles.shadow}`}
                        id="LynchSyndromePiv"
                        type="radio"
                        checked={uterine.lynch_syndrome === "+ve"}
                        readOnly
                      />
                      +ve
                    </label>
                    <label htmlFor="LynchSyndromeNiv" className="flex gap-4">
                      <input
                        name="LynchSyndrome"
                        className={`${styles.shadow}`}
                        id="LynchSyndromeNiv"
                        type="radio"
                        checked={uterine.lynch_syndrome === "-ve"}
                        readOnly
                      />{" "}
                      -ve
                    </label>
                  </div>
                </div>

                <div>
                  <p>Irregular bleeding</p>
                  <div className="  rounded-lg p-2 xl:w-1/2 mt-2 ">
                    <label
                      htmlFor="IrregularBleedingYes"
                      className="flex gap-4"
                    >
                      <input
                        name="IrregularBleeding"
                        className={`${styles.shadow}`}
                        id="IrregularBleedingYes"
                        checked={uterine.irregular_bleeding === 1}
                        readOnly
                        type="radio"
                        value={true}
                      />{" "}
                      yes
                    </label>
                    <label htmlFor="IrregularBleedingNo" className="flex gap-4">
                      <input
                        name="IrregularBleeding"
                        className={`${styles.shadow}`}
                        id="IrregularBleedingNo"
                        checked={uterine.irregular_bleeding === 0}
                        readOnly
                        type="radio"
                        value={false}
                      />{" "}
                      no
                    </label>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 md:col-span-2 flex-col flex gap-8">
                <div className="w-full  overflow-auto flex flex-col gap-5">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th></th>
                        <th className="bg-gray-300 border-2 border-blue-700 border-opacity-35 px-5">
                          Result
                        </th>
                        <th className="bg-gray-300 border-2 border-blue-700 border-opacity-35 px-5">
                          Comments
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th
                          rowSpan="4"
                          className="bg-gray-300 px-2 border-2 border-blue-700 border-opacity-35"
                        >
                          TVS
                        </th>
                      </tr>
                      <tr>
                        <th className="bg-gray-300 px-5 border-2 border-blue-700 border-opacity-35">
                          Perimetrium
                        </th>
                        <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                          <input
                            name="tvs_perimetrium_result"
                            className="outline-none bg-transparent  px-3 w-full"
                            type="text"
                            value={uterine.tvs_perimetrium_result}
                            readOnly
                          />
                        </td>
                        <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                          <input
                            name="tvs_perimetrium_comment"
                            className="outline-none bg-transparent  px-3 w-full"
                            type="text"
                            value={uterine.tvs_perimetrium_comment}
                            readOnly
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-gray-300 px-5 border-2 border-blue-700 border-opacity-35">
                          Mayometrium
                        </th>
                        <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                          <input
                            name="tvs_myometrium_result"
                            className="outline-none bg-transparent  px-3 w-full"
                            type="text"
                            value={uterine.tvs_myometrium_result}
                            readOnly
                          />
                        </td>
                        <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                          <input
                            name="tvs_myometrium_comment"
                            className="outline-none  bg-transparent px-3 w-full"
                            type="text"
                            value={uterine.tvs_myometrium_comment}
                            readOnly
                          />
                        </td>
                      </tr>
                      <tr>
                        <th className="bg-gray-300 px-5 border-2 border-blue-700 border-opacity-35">
                          Endometrium
                        </th>
                        <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                          <input
                            name="tvs_endometrium_result"
                            className="outline-none bg-transparent  px-3 w-full"
                            type="text"
                            value={uterine.tvs_endometrium_result}
                            readOnly
                          />
                        </td>
                        <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                          <input
                            name="tvs_endometrium_comment"
                            className="outline-none  bg-transparent px-3 w-full"
                            type="text"
                            value={uterine.tvs_endometrium_comment}
                            readOnly
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th className="bg-gray-300 border-2 border-blue-700 border-opacity-35 px-5">
                          Result
                        </th>
                        <th className="bg-gray-300 border-2 border-blue-700 border-opacity-35 px-5">
                          Comments
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th className="bg-gray-300 px-5 border-2 border-blue-700 border-opacity-35">
                          Biopsy
                        </th>
                        <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                          <input
                            name="biopsy_result"
                            className="outline-none bg-transparent  px-3 w-full"
                            type="text"
                            value={uterine.biopsy_result}
                            readOnly
                          />
                        </td>
                        <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                          <input
                            name="biopsy_comment"
                            className="outline-none bg-transparent px-3 w-full"
                            type="text"
                            value={uterine.biopsy_comment}
                            readOnly
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">
            {(user?.role === "doctor" || user?.role === "admin") && (
              <>
                <Link
                  to={`/patient/uterine/update`}
                  className="rounded-lg text-white bg-blue-700 flex gap-4 px-10 py-2"
                >
                  <MdEdit size={"1.5rem"} />
                  Edit
                </Link>

              </>
            )}

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

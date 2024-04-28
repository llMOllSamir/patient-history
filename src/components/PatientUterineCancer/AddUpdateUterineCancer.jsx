import React, { useEffect } from "react";
import { useFormik } from "formik";
import styles from "./PatientUterineCancer.module.css";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImSpinner6 } from "react-icons/im";
import notify from "../../utilities/alert-toastify";
import {
  useAddUterine,
  useGetMutateUterineCancer,
  useUpdateUterine,
} from "../../hooks/uterine";
import { clearUterine, setUterine } from "../../store/slices/uterineSlice";
import LoadingPatient from "../../LoadingPatient";

export default function AddUpdateUterineCancer({ state = "update" }) {
  const dispatech = useDispatch();
  const { data: patient } = useSelector((state) => state.patient);

  const { uterine } = useSelector((state) => state.uterine);

  const onSuccess = () => {
    notify(
      `Examination ${state === "update" ? "Updated" : "Added"} Successfully`,
      "success"
    );
    navigate(`/patient/uterine/${patient?.id}`);
  };
  const onError = (error) => {
    notify("Something Wrong", "error");
  };

  const { isLoading: loadedUpdate, mutate: updateMutate } = useUpdateUterine({
    id: patient?.id,
    onSuccess,
    onError,
  });

  const { isLoading: AddLoading, mutate: addMutate } = useAddUterine({
    onSuccess,
    onError,
  });

  const onGetSuccess = (values) => {
    dispatech(setUterine(values.data));
  };
  const { isLoading, error, isError, mutate } = useGetMutateUterineCancer({
    id: patient?.id,
    onGetSuccess,
  });

  const validationSchema = yup.object({
    lynch_syndrome: yup.string(),
    irregular_bleeding: yup.string(),
    tvs_perimetrium_result: yup.string(),
    tvs_myometrium_result: yup.string(),
    tvs_endometrium_result: yup.string(),
    biopsy_result: yup.string(),
    biopsy_comment: yup.string(),
    tvs_perimetrium_comment: yup.string(),
    tvs_myometrium_comment: yup.string(),
    tvs_endometrium_comment: yup.string(),
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      patient_id: patient?.id || "",
      lynch_syndrome: uterine.lynch_syndrome || "",
      irregular_bleeding: uterine.irregular_bleeding === 1 ? true : false,
      tvs_perimetrium_result: uterine.tvs_perimetrium_result || "",
      tvs_myometrium_result: uterine.tvs_myometrium_result || "",
      tvs_endometrium_result: uterine.tvs_endometrium_result || "",
      biopsy_result: uterine.biopsy_result || "",
      biopsy_comment: uterine.biopsy_comment || "",
      tvs_perimetrium_comment: uterine.tvs_perimetrium_comment || "",
      tvs_myometrium_comment: uterine.tvs_myometrium_comment || "",
      tvs_endometrium_comment: uterine.tvs_endometrium_comment || "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (state === "update") {
        updateMutate({
          ...values,
          irregular_bleeding:
            values.irregular_bleeding === "true" ? true : false,
        });
      } else {
        addMutate({
          ...values,
          irregular_bleeding:
            values.irregular_bleeding === "true" ? true : false,
        });
      }
    },
  });

  useEffect(() => {
    if (state === "update" && patient) {
      mutate({ id: patient?.id });
    } else {
      dispatech(clearUterine());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatech, patient]);

  useEffect(() => {
    // Set initial values for formik after Uterine data is fetched
    if (uterine) {
      formik.setValues({
        patient_id: patient?.id || "",
        lynch_syndrome: uterine.lynch_syndrome || "",
        irregular_bleeding: uterine.irregular_bleeding === 1 ? true : false,
        tvs_perimetrium_result: uterine.tvs_perimetrium_result || "",
        tvs_myometrium_result: uterine.tvs_myometrium_result || "",
        tvs_endometrium_result: uterine.tvs_endometrium_result || "",
        biopsy_result: uterine.biopsy_result || "",
        biopsy_comment: uterine.biopsy_comment || "",
        tvs_perimetrium_comment: uterine.tvs_perimetrium_comment || "",
        tvs_myometrium_comment: uterine.tvs_myometrium_comment || "",
        tvs_endometrium_comment: uterine.tvs_endometrium_comment || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uterine]);

  if (isLoading) {
    return <LoadingPatient />;
  }

  if (isError) {
    return (
      <div className="mx-4  text-center h-1/2 items-center justify-center  flex flex-col gap-5  ">
        <h2 className="font-bold text-red-500 text-3xl">
          {error.response.data.error}
        </h2>
      </div>
    );
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="select-none capitalize  px-2 md:px-10"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className=" flex flex-col gap-5 ">
          <div>
            <p>Lynch Syndrome</p>
            <div className="border-2 border-gray-400 rounded-lg p-2 xl:w-1/2 mt-2 ">
              <label htmlFor="LynchSyndromePiv" className="flex gap-4">
                <input
                  name="lynch_syndrome"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${styles.shadow}`}
                  id="LynchSyndromePiv"
                  type="radio"
                  value={"+ve"}
                  defaultChecked={formik.values.lynch_syndrome === "+ve"}
                />{" "}
                +ve
              </label>
              <label htmlFor="LynchSyndromeNiv" className="flex gap-4">
                <input
                  name="lynch_syndrome"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${styles.shadow}`}
                  id="LynchSyndromeNiv"
                  type="radio"
                  value={"-ve"}
                  defaultChecked={formik.values.lynch_syndrome === "-ve"}
                />{" "}
                -ve
              </label>
            </div>
          </div>

          <div>
            <p>Irregular bleeding</p>
            <div className="border-2 border-gray-400 rounded-lg p-2 xl:w-1/2 mt-2 ">
              <label htmlFor="IrregularBleedingYes" className="flex gap-4">
                <input
                  name="irregular_bleeding"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${styles.shadow}`}
                  id="IrregularBleedingYes"
                  type="radio"
                  value={true}
                  defaultChecked={formik.values.irregular_bleeding}
                />{" "}
                yes
              </label>
              <label htmlFor="IrregularBleedingNo" className="flex gap-4">
                <input
                  name="irregular_bleeding"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`${styles.shadow}`}
                  id="IrregularBleedingNo"
                  type="radio"
                  value={false}
                  defaultChecked={!formik.values.irregular_bleeding}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.tvs_perimetrium_result}
                      className="outline-none bg-transparent  px-3 w-full"
                      type="text"
                    />
                  </td>
                  <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.tvs_perimetrium_comment}
                      name="tvs_perimetrium_comment"
                      className="outline-none bg-transparent  px-3 w-full"
                      type="text"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="bg-gray-300 px-5 border-2 border-blue-700 border-opacity-35">
                    Mayometrium
                  </th>
                  <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.tvs_myometrium_result}
                      name="tvs_myometrium_result"
                      className="outline-none bg-transparent  px-3 w-full"
                      type="text"
                    />
                  </td>
                  <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                    <input
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.tvs_myometrium_comment}
                      name="tvs_myometrium_comment"
                      className="outline-none  bg-transparent px-3 w-full"
                      type="text"
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="outline-none bg-transparent  px-3 w-full"
                      type="text"
                      value={formik.values.tvs_endometrium_result}
                    />
                  </td>
                  <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                    <input
                      name="tvs_endometrium_comment"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="outline-none  bg-transparent px-3 w-full"
                      type="text"
                      value={formik.values.tvs_endometrium_comment}
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="outline-none bg-transparent  px-3 w-full"
                      type="text"
                      value={formik.values.biopsy_result}
                    />
                  </td>
                  <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                    <input
                      name="biopsy_comment"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="outline-none bg-transparent px-3 w-full"
                      type="text"
                      value={formik.values.biopsy_comment}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">
          <button
            type="submit"
            className="rounded-lg text-white bg-fuchsia-900 flex text-base md:text-xl font-medium gap-4 px-20 py-2"
          >
            {loadedUpdate || AddLoading ? (
              <ImSpinner6 className="animate-spin " size={"1.6rem"} />
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </form>
  );
}

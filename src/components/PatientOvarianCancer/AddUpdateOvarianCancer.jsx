import React from "react";
import { useFormik } from "formik";
import styles from "./PatientOvarianCancer.module.css"
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImSpinner6 } from "react-icons/im";
import {
  addOvarian,
  updateOvarian,
} from "../../store/slices/ovarianSlice";

export default function AddUpdateOvarianCancer({ state = "update" }) {
  const dispatech = useDispatch();
  const { data: patient } = useSelector((state) => state.patient)
  const { ovarian, loading } = useSelector((state) => state.ovarian);

  const validationSchema = yup.object({
    breast_cancer_history: yup.string(),
    relatives_with_ovarian_cancer: yup.string(),
    gene_mutation_or_lynch_syndrome: yup.string(),
    tvs_result: yup.string(),
    tvs_comment: yup.string(),
    "ca-125_result": yup.string(),
    "ca-125_comment": yup.string(),
    recommendations: yup.string(),
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      "patient_id": patient?.id || "",
      "breast_cancer_history": false,
      "relatives_with_ovarian_cancer": false,
      "gene_mutation_or_lynch_syndrome": false,
      "tvs_result": (state === "update" && ovarian?.tvs_result) || "",
      "tvs_comment": (state === "update" && ovarian?.tvs_comment) || "",
      "ca-125_result": (state === "update" && ovarian && ovarian["ca-125_result"]) || "",
      "ca-125_comment": (state === "update" && ovarian && ovarian["ca-125_comment"]) || "",
      "recommendations": (state === "update" && ovarian?.recommendations) || ""
    },
    validationSchema,
    onSubmit: (values) => {
      if (state === "update") {
        dispatech(
          updateOvarian({
            id: Number(patient?.id),
            data: {
              patient_id: patient?.id, ...values
              ,
              breast_cancer_history: values.breast_cancer_history === "true" ? true : false,
              relatives_with_ovarian_cancer: values.relatives_with_ovarian_cancer === "true" ? true : false,
              gene_mutation_or_lynch_syndrome: values.gene_mutation_or_lynch_syndrome === "true" ? true : values.gene_mutation_or_lynch_syndrome === "false" ? false : null,
            },
          })
        ).then((response) => {
          if (response.payload.examination) {
            navigate(
              `/patient/ovarian/${response.payload.examination.patient_id}`
            );
          }
        });
      } else {
        dispatech(
          addOvarian({
            data: {
              patient_id: patient?.id,
              ...values
              ,
              breast_cancer_history: values.breast_cancer_history === "true" ? true : false,
              relatives_with_ovarian_cancer: values.relatives_with_ovarian_cancer === "true" ? true : false,
              gene_mutation_or_lynch_syndrome: values.gene_mutation_or_lynch_syndrome === "true" ? true : values.gene_mutation_or_lynch_syndrome === "false" ? false : null,
            },
          })
        ).then((response) => {
          if (response.payload.examination) {
            navigate(
              `/patient/ovarian/${response.payload.examination.patient_id}`
            );
          }
        });
      }
    },
  });




  return (
    <form onSubmit={formik.handleSubmit} className="select-none capitalize  px-2 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className=" flex flex-col gap-5 ">

          <div>
            <p>Do you have a personal history of
              breast cancer?</p>
            <div className="border-2 border-gray-400 rounded-lg p-2 xl:w-1/2 mt-2 ">
              <label htmlFor="historyYes" className="flex gap-4">
                <input name="breast_cancer_history" onChange={formik.handleChange}  onBlur={formik.handleBlur} className={`${styles.shadow}`} id="historyYes" type="radio" value={true} /> yes
              </label>
              <label htmlFor="historyNo" className="flex gap-4">
                <input name="breast_cancer_history" onChange={formik.handleChange}   onBlur={formik.handleBlur} className={`${styles.shadow}`} id="historyNo" type="radio" value={false} /> no
              </label>
            </div>
          </div>

          <div>
            <p>Do you have one or more relatives with
              ovarian cancer?</p>
            <div className="border-2 border-gray-400 rounded-lg p-2 xl:w-1/2 mt-2 ">
              <label htmlFor="relativeYes" className="flex gap-4">
                <input name="relatives_with_ovarian_cancer" onChange={formik.handleChange}  onBlur={formik.handleBlur} className={`${styles.shadow}`} id="relativeYes" type="radio" value={true} /> yes
              </label>
              <label htmlFor="relativeNo" className="flex gap-4">
                <input name="relatives_with_ovarian_cancer" onChange={formik.handleChange}   onBlur={formik.handleBlur} className={`${styles.shadow}`} id="relativeNo" type="radio" value={false} /> no
              </label>
            </div>
          </div>

          <div>
            <p>Do you have the BRCA1 or BRCA2 gene mutation
              or Lynch syndrome - hereditary nonpolyposis
              colorectal cancer (HNPCC)? </p>
            <div className="border-2 border-gray-400 rounded-lg p-2 xl:w-1/2 mt-2 ">
              <label htmlFor="geneYes" className="flex gap-4">
                <input name="gene_mutation_or_lynch_syndrome" onChange={formik.handleChange}   onBlur={formik.handleBlur} className={`${styles.shadow}`} id="geneYes" type="radio" value={true} /> yes
              </label>
              <label htmlFor="geneNo" className="flex gap-4">
                <input name="gene_mutation_or_lynch_syndrome" onChange={formik.handleChange}   onBlur={formik.handleBlur} className={`${styles.shadow}`} id="geneNo" type="radio" value={false} /> no
              </label>
              <label htmlFor="geneNull" className="flex gap-4">
                <input name="gene_mutation_or_lynch_syndrome" onChange={formik.handleChange}  onBlur={formik.handleBlur} className={`${styles.shadow}`} id="geneNull" type="radio" value={null} /> Don’t know
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
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.tvs_result}
                    name="tvs_result" className="outline-none bg-transparent  px-5" type="text" />
                </td>
                <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.tvs_comment}
                    name="tvs_comment" className="outline-none bg-transparent  px-5" type="text" />
                </td>
              </tr>
              <tr >
                <th className="bg-gray-300 px-5 border-2 border-blue-700 border-opacity-35">CA-125</th>
                <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values["ca-125_result"]}
                    name="ca-125_result" className="outline-none bg-transparent  px-5" type="text" />
                </td>
                <td className="border-2 bg-fuchsia-200 border-blue-700 border-opacity-35">
                  <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values["ca-125_comment"]}
                    name="ca-125_comment" className="outline-none  bg-transparent px-5" type="text" />
                </td>
              </tr>
            </table>
          </div>


          <div className="flex flex-col gap-2 ">
            <label htmlFor="recommendations">Recommendations</label>
            <textarea
              name="recommendations"
              id="recommendations"
              className="border-2 p-2 outline-none border-gray-600 border-opacity-40 md:w-1/2 resize-none placeholder:text-gray-500 placeholder:text-opacity-40"
              placeholder="Write Your Recommendations"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.recommendations}
              cols="30" rows="10"></textarea>
          </div>

        </div>
      </div>

      <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">
        <button
          type="submit"
          className="rounded-lg text-white bg-fuchsia-900 flex text-base md:text-xl font-medium gap-4 px-20 py-2"
        >
          {loading ? (
            <ImSpinner6 className="animate-spin " size={"1.6rem"} />
          ) : (
            "Save"
          )}
        </button>
      </div>
    </form>
  );

}


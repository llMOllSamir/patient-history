import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingPatient from "../../LoadingPatient";
import { ImSpinner6 } from "react-icons/im";
import { useEffect } from "react";
import { MdAdd } from "react-icons/md";
import {
  addOsteoporosis,
  clearOsteoporosisData,
  getOsteoporosis,
  updateOsteoporosis,
} from "../../store/slices/osteoporosisSlice";
import {
  addOvarian,
  clearOvarianData,
  getOvarian,
  updateOvarian,
} from "../../store/slices/ovarianSlice";

export default function AddUpdateOvarianCancer({ state = "update" }) {
  const { id } = useParams();
  const dispatech = useDispatch();

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

  const { ovarian, loading, error } = useSelector((state) => state.ovarian);
  const patient = useSelector((state) => state.patient);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      breast_cancer_history: ovarian.breast_cancer_history ? "yes" : "no",
      relatives_with_ovarian_cancer: ovarian.relatives_with_ovarian_cancer
        ? "yes"
        : "no",
      gene_mutation_or_lynch_syndrome: ovarian.gene_mutation_or_lynch_syndrome
        ? "yes"
        : "no",
      tvs_result: ovarian.tvs_result || "",
      tvs_comment: ovarian.tvs_comment || "",
      "ca-125_result": ovarian["ca-125_result"] || "",
      "ca-125_comment": ovarian["ca-125_comment"] || "",
      recommendations: ovarian.recommendations || "",
    },
    validationSchema,
    onSubmit: (values) => {
      values.breast_cancer_history =
        values.breast_cancer_history.toLocaleLowerCase() === "yes"
          ? true
          : false;
      values.relatives_with_ovarian_cancer =
        values.relatives_with_ovarian_cancer.toLocaleLowerCase() === "yes"
          ? true
          : false;
      values.gene_mutation_or_lynch_syndrome =
        values.gene_mutation_or_lynch_syndrome.toLocaleLowerCase() === "yes"
          ? true
          : false;
      if (state === "update") {
        dispatech(
          updateOvarian({
            id: Number(ovarian.id),
            data: { patient_id: id, ...values },
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
            data: { patient_id: patient.id, ...values },
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

  useEffect(() => {
    if (state === "update") {
      dispatech(getOvarian({ id: Number(id) }));
    } else {
      dispatech(clearOvarianData());
    }
  }, [dispatech, id]);

  useEffect(() => {
    // Set initial values for formik after ovarian data is fetched
    if (ovarian) {
      formik.setValues({
        breast_cancer_history: ovarian.breast_cancer_history ? "Yes" : "No",
        relatives_with_ovarian_cancer: ovarian.relatives_with_ovarian_cancer
          ? "Yes"
          : "No",
        gene_mutation_or_lynch_syndrome: ovarian.gene_mutation_or_lynch_syndrome
          ? "Yes"
          : "No",
        tvs_result: ovarian.tvs_result || "",
        tvs_comment: ovarian.tvs_comment || "",
        "ca-125_result": ovarian["ca-125_result"] || "",
        "ca-125_comment": ovarian["ca-125_comment"] || "",
        recommendations: ovarian.recommendations || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ovarian]);

  if (loading) {
    return <LoadingPatient />;
  }
  if (error) {
    return (
      <div className="mx-4  text-center h-1/2 items-center justify-center   flex flex-col gap-5  ">
        <h2 className="font-bold text-red-500 text-3xl">
          something wrong happened
        </h2>
        <Link
          to={"/ovarian"}
          className="bg-fuchsia-900 text-lg px-3 text-white rounded-lg py-2"
        >
          Search With Code
        </Link>
      </div>
    );
  }

  if (ovarian) {
    return (
      <form onSubmit={formik.handleSubmit} className="select-none">
        <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
          <div className={`flex flex-col font-medium gap-1  capitalize `}>
            <label htmlFor={"breast_cancer_history"} className="text-base ">
              Do You Have A Personal History Of Breast Cancer?
            </label>
            <select
              value={formik.values.breast_cancer_history}
              name="breast_cancer_history"
              id="breast_cancer_history"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border outline-none px-5 py-1 border-gray-500 placeholder:text-gray-500  rounded-lg  xl:w-1/2 w-full `}
            >
              {["Yes", "No"].map((state, index) => (
                <option
                  key={index}
                  className="capitalize cursor-pointer"
                  value={state}
                >
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className={`flex flex-col font-medium gap-1  capitalize `}>
            <label
              htmlFor={"relatives_with_ovarian_cancer"}
              className="text-base "
            >
              Do You Have One Or More Relatives With Ovarian Cancer?
            </label>
            <select
              value={formik.values.relatives_with_ovarian_cancer}
              name="relatives_with_ovarian_cancer"
              id="relatives_with_ovarian_cancer"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border outline-none px-5 py-1 border-gray-500 placeholder:text-gray-500  rounded-lg  xl:w-1/2 w-full `}
            >
              {["Yes", "No"].map((state, index) => (
                <option
                  key={index}
                  className="capitalize cursor-pointer"
                  value={state}
                >
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div className={`flex flex-col font-medium gap-1  capitalize `}>
            <label
              htmlFor={"gene_mutation_or_lynch_syndrome"}
              className="text-base"
            >
              Do You Have The BRCA1 Or BRCA2 Gene Mutation Or Lynch Syndrome -
              Hereditary Nonpolyposis Colorectal Cancer (HNPCC)?
            </label>
            <select
              value={formik.values.gene_mutation_or_lynch_syndrome}
              name="gene_mutation_or_lynch_syndrome"
              id="gene_mutation_or_lynch_syndrome"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border outline-none px-5 py-1 border-gray-500 placeholder:text-gray-500  rounded-lg  xl:w-1/2 w-full `}
            >
              {["Yes", "No"].map((state, index) => (
                <option
                  key={index}
                  className="capitalize cursor-pointer"
                  value={state}
                >
                  {state}
                </option>
              ))}
            </select>
          </div>

          <InputInfo form={formik} name={"tvs_result"} title={"tvs result"} />
          <InputInfo form={formik} name={"tvs_comment"} title={"tvs comment"} />

          <InputInfo
            form={formik}
            name={"ca-125_result"}
            title={"ca-125 result"}
          />
          <InputInfo
            form={formik}
            name={"ca-125_comment"}
            title={"ca-125 comment"}
          />

          <label
            for="recommendations"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            recommendations
          </label>
          <textarea
            id="recommendations"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Write your recommendation here..."
            value={formik.values.recommendations}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          ></textarea>
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
  } else {
    return (
      <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">
        <Link
          to={`/patient/osteoporosis/add/`}
          className="rounded-lg text-white bg-blue-700 flex gap-4 px-10 py-2"
        >
          <MdAdd />
          Edit
        </Link>
      </div>
    );
  }
}

const InputInfo = ({ title, name, form, type = "text", col }) => {
  return (
    <div
      className={`flex flex-col font-medium gap-1  capitalize ${
        col && `md:col-span-${col}`
      }`}
    >
      <label htmlFor={name} className="text-base ">
        {title}
      </label>
      {form.errors[name] && form.touched[name] && (
        <p className="text-red-600 text-sm font-semibold">
          {form.errors[name]}
        </p>
      )}

      <input
        name={name}
        id={name}
        type={type}
        value={form.values[name]}
        onBlur={form.handleBlur}
        onChange={form.handleChange}
        className={`border outline-none px-5 py-1 border-gray-500 placeholder:text-gray-500  rounded-lg ${
          col ? "xl:w-1/4 lg:1/2" : "xl:w-1/2 "
        } w-full `}
        placeholder={`Insert ${title}`}
      />
    </div>
  );
};

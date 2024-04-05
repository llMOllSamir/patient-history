import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingPatient from "../../LoadingPatient";
import { ImSpinner6 } from "react-icons/im";

import {
  addGeneralExamination,
  updateGeneralExamination,
} from "../../store/slices/generalExaminationSlice";

export default function AddUpdateGeneralExamination({ state = "update" }) {
  const dispatech = useDispatch();

  const validationSchema = yup.object({
    height: yup.number("Must be number!"),
    pulse: yup.number("Must be number!"),
    weight: yup.number("Must be number!"),
    random_blood_sugar: yup.number(),
    blood_pressure: yup
      .string()
      .matches(/^\d{1,3}\/\d{1,3}$/, "Enter in format 90/75"),
  });

  const { generalExamination, loading, error } = useSelector(
    (state) => state.generalExamination
  );

  const { data } = useSelector((state) => state.patient);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      height: (state === "update" && generalExamination?.height) || "",
      pulse: (state === "update" && generalExamination?.pulse) || "",
      weight: (state === "update" && generalExamination?.weight) || "",
      random_blood_sugar: (state === "update" && generalExamination?.random_blood_sugar) || "",
      blood_pressure: (state === "update" && generalExamination?.blood_pressure) || "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (state === "update") {
        dispatech(
          updateGeneralExamination({
            id: Number(generalExamination.id),
            data: { patient_id: data.id, ...values },
          })
        ).then((response) => {
          if (response.payload.examination) {
            navigate(`/patient/general-examination/${data.id}`);
          }
        });
      } else {
        dispatech(
          addGeneralExamination({
            data: { patient_id: data.id, ...values },
          })
        ).then((response) => {
          if (response.payload.examination) {
            navigate(`/patient/general-examination/${data.id}`);
          }
        });
      }
    },
  });

  if (loading) {
    return <LoadingPatient />;
  }

  if (error) {
    return (
      <div className="mx-4  text-center h-1/2 items-center justify-center   flex flex-col gap-5  ">
        <h2 className="font-bold text-red-500 text-lg md:text-3xl">
          something Went wrong
        </h2>
        <Link
          to={"/General-examination"}
          className="bg-fuchsia-900 text-sm  md:text-lg px-3 text-white rounded-lg py-2"
        >
          Search With Code
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className="select-none">
      <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
        <InputInfo form={formik} name={"height"} title={"Height"} />

        <InputInfo
          form={formik}
          name={"pulse"}
          title={"Pulse"}
          type="number"
        />

        <InputInfo
          form={formik}
          name={"weight"}
          title={"Weight"}
          type="number"
        />

        <InputInfo
          form={formik}
          name={"random_blood_sugar"}
          title={"Random Blood Sugar"}
          type="number"
        />

        <InputInfo
          form={formik}
          name={"blood_pressure"}
          title={"Blood Pressure"}
          type="text"
        />
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



const InputInfo = ({ title, name, form, type = "text", col }) => {
  return (
    <div
      className={`flex flex-col font-medium gap-1  capitalize ${col && `md:col-span-${col}`
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
        className={`border outline-none px-5 py-1 border-gray-500 placeholder:text-gray-500  rounded-lg ${col ? "xl:w-1/4 lg:1/2" : "xl:w-1/2 "
          } w-full `}
        placeholder={`Insert ${title}`}
      />
    </div>
  );
};


import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ImSpinner6 } from "react-icons/im";

import {
  addOsteoporosis,
  updateOsteoporosis,
} from "../../store/slices/osteoporosisSlice";

export default function AddUpdateOsteoporosisHistory({ state = "update" }) {
  const dispatech = useDispatch();
  const navigate = useNavigate();


  const validationSchema = yup.object({
    weight: yup.number("Must be number!").required("insert Weight"),
    current_oestrogen_use: yup.string().required("What Is The Current Oestrogen "),
  });

  const { osteoporosis, loading } = useSelector(
    (state) => state.osteoporosis
  );

  const { data: patient } = useSelector((state) => state.patient);

  const formik = useFormik({
    initialValues: {
      weight: osteoporosis?.weight || "",
      current_oestrogen_use: osteoporosis?.current_oestrogen_use ? "yes" : "no",
    },
    validationSchema,
    onSubmit: (values) => {
      if (typeof values.current_oestrogen_use !== "boolean") {
        values.current_oestrogen_use =
          values.current_oestrogen_use.toLowerCase() === "yes"
            ? true
            : false;
      }
      if (state === "update") {
        dispatech(
          updateOsteoporosis({
            id: patient.id,
            data: { patient_id: patient.id, ...values, age: osteoporosis?.age || patient.age },
          })
        ).then((response) => {
          if (response.payload.examination) {
            navigate(
              `/patient/osteoporosis/${patient.id}`
            );
          }
        });
      } else {
        dispatech(
          addOsteoporosis({
            data: { patient_id: patient.id, ...values },
          })
        ).then((response) => {
          if (response.payload.test) {
            navigate(
              `/patient/osteoporosis/${patient.id}`
            );
          }
        });
      }
    },
  });



  return (
    <form onSubmit={formik.handleSubmit} className="select-none">
      <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">

        <label htmlFor="weight" className="flex capitalize flex-col gap-2 text-base font-medium ">
          Weight
          <input
            id="weight"
            type="number"
            placeholder="Insert Weight"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.weight}
            name="weight"
            className="outline-none focus:border-black   px-5 py-2 rounded-lg  2xl:w-1/2 w-full   border-2  border-gray-400 text-black" />
          {formik.touched.weight && formik.errors.weight && <p className="text-red-600 text-sm font-semibold">{formik.errors.weight}</p>}
        </label>

        <SelectedInput formik={formik} label={"current oestrogen use"} name="current_oestrogen_use" opt={["yes", "no"]} />
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



const SelectedInput = ({ formik, label, opt = [], name = "", placeholder }) => {


  return <div className={`flex flex-col font-medium   capitalize gap-2 `}>
    <label htmlFor={name} className="text-base">
      {label}
    </label>
    <select
      value={formik.values[name]}
      name={name}
      id={name}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      className={` outline-none   px-5 py-2   border-2  border-gray-400 text-black   rounded-lg  2xl:w-1/2 w-full `}
    >

      {placeholder && <option
        className="capitalize cursor-pointer"
        value={""}
      >
        {placeholder}
      </option>}
      {opt.map((data, index) => (
        <option
          key={index}
          className="capitalize cursor-pointer text-black"
          value={data}
        >
          {data}
        </option>
      ))}
    </select>
    {formik.touched[name] && formik.errors[name] && <p className="text-red-600 text-sm font-semibold">{formik.errors[name]}</p>}
  </div>
}

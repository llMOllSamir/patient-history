import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ImSpinner6 } from "react-icons/im";

import {
  addBreast,
  updateBreast,
} from "../../store/slices/breastSlice";


export default function AddUpdateBreastCancerHistory({ state = "update" }) {
  const dispatech = useDispatch();
  const navigate = useNavigate();
  const { breast, loading, error } = useSelector((state) => state.breast);
  const { data: patient } = useSelector((state) => state.patient);



  // vaildation schema 
  const validationSchema = yup.object({
    age: yup.number("Must be number!").moreThan(0, "Age must be > 0"),
    family_history: yup.string(),
  });




  // handle form 
  const formik = useFormik({
    initialValues: {
      age: breast.age || "",
      family_history: breast.family_history || "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (state === "update") {
        dispatech(
          updateBreast({
            id: Number(breast.id),
            data: { patient_id: patient?.id, ...values },
          })
        ).then((response) => {
          if (response.payload.examination) {
            navigate(
              `/patient/breast/${response.payload.examination.patient_id}`
            );
          }
        });
      } else {
        dispatech(
          addBreast({
            data: { patient_id: patient?.id, ...values },
          })
        ).then((response) => {
          if (response.payload.examination) {
            navigate(
              `/patient/breast/${response.payload.examination.patient_id}`
            );
          }
        });
      }
    },
  });





  if (error) {
    return (
      <div className="mx-4  text-center h-1/2 items-center justify-center   flex flex-col gap-5  ">
        <h2 className="font-bold text-red-500 text-3xl">
          something wrong happened
        </h2>
        <Link
          to={"/breast"}
          className="bg-fuchsia-900 text-lg px-3 text-white rounded-lg py-2"
        >
          Search With Code
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className="select-none">
      <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
        <div className={`flex flex-col font-medium gap-1  capitalize `}>
          <label htmlFor={"family_history"} className="text-base">
            family history
          </label>
          <select
            value={formik.values.family_history}
            name="family_history"
            id="family_history"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`border outline-none px-5 py-1 border-gray-500 placeholder:text-gray-500  rounded-lg  xl:w-1/2 w-full `}
          >
            <option className="capitalize cursor-pointer" value={""}>
              Select State
            </option>
            {[
              "negative",
              "positive in second degree relatives (any number)",
              "positive in one first degree relatives",
              "positive in more than one first degree relatives",
            ].map((state, index) => (
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

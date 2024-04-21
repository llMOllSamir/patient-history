import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoadingPatient from "../../LoadingPatient";
import { ImSpinner6 } from "react-icons/im";
import {
  addObstetrics,
  updateObstetrics,
} from "../../store/slices/obstetricsSlice";

export default function AddUpdateObstetricsHistory({ state = "update" }) {
  const dispatech = useDispatch();
  const navigate = useNavigate();

  const { data } = useSelector(state => state.patient)



  const { obstetrics, loading, error } = useSelector(
    (state) => state.obstetrics
  );



  //  validation schema 
  const validationSchema = yup.object({
    gravidity: yup.number("Must be number!"),
    parity: yup.number("Must be number!"),
    abortion: yup.number("Must be number!"),
    notes: yup.string(),
  });
  // handle form data 
  const formik = useFormik({
    initialValues: {
      gravidity: (state === "update " && obstetrics?.gravidity) || "",
      parity: (state === "update " && obstetrics?.parity) || "",
      abortion: (state === "update " && obstetrics?.abortion) || "",
      notes: (state === "update " && obstetrics?.notes) || "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (state === "update") {
        dispatech(updateObstetrics({ id: data?.id, data: { patient_id: data?.id, ...values } })).then(response => {
          if (response.payload.examination) {
            navigate(
              `/patient/obstetrics-history/${data?.id}`
            );
          }
        })
      } else {
        dispatech(
          addObstetrics({
            data: {
              patient_id: data?.id, ...values,
            }
          })
        ).then((response) => {
          if (response.payload.obstetric) {
            navigate(
              `/patient/obstetrics-history/${data?.id}`
            );
          }
        });
      }
    },
  });





  return (
    <form onSubmit={formik.handleSubmit} className="select-none">
      <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
        <InputInfo form={formik} name={"gravidity"} title={"gravidity"} />

        <InputInfo
          form={formik}
          name={"parity"}
          title={"parity"}
          type="number"
        />

        <InputInfo
          form={formik}
          name={"abortion"}
          title={"abortion"}
          type="number"
        />

        <InputInfo form={formik} name={"notes"} title={"notes"} type="text" />
      </div>
      <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">
        <button
          type="submit"
          className="rounded-lg text-white bg-fuchsia-900 flex text-base md:text-xl font-medium gap-4 px-20 py-2"
        >
          {loading ? (
            <ImSpinner6 className="animate-spin " size={"1.6rem"} />
          ) : (
            state === "update" ? "Save" : "add"
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

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
  addObstetrics,
  clearObstetricsData,
  getObstetrics,
  updateObstetrics,
} from "../../store/slices/obstetricsSlice";

export default function AddUpdateObstetricsHistory({ state = "update" }) {
  const { id } = useParams();
  const dispatech = useDispatch();

  const validationSchema = yup.object({
    gravidity: yup.number("Must be number!"),
    parity: yup.number("Must be number!"),
    abortion: yup.number("Must be number!"),
    notes: yup.string(),
  });

  const { obstetrics, loading, error } = useSelector(
    (state) => state.obstetrics
  );
  const patient = useSelector((state) => state.patient);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      gravidity: obstetrics.gravidity || "",
      parity: obstetrics.parity || "",
      abortion: obstetrics.abortion || "",
      notes: obstetrics.notes || "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (state === "update") {
        dispatech(
          updateObstetrics({
            id: Number(obstetrics.id),
            data: { patient_id: id, ...values },
          })
        ).then((response) => {
          if (response.payload.examination) {
            navigate(
              `/patient/obstetrics-history/${response.payload.examination.patient_id}`
            );
          }
        });
      } else {
        dispatech(
          addObstetrics({
            data: { patient_id: patient.id, ...values },
          })
        ).then((response) => {
          if (response.payload.obstetric) {
            navigate(
              `/patient/obstetrics-history/${response.payload.obstetric.patient_id}`
            );
          }
        });
      }
    },
  });

  useEffect(() => {
    if (state === "update") {
      dispatech(getObstetrics({ id: Number(id) }));
    } else {
      dispatech(clearObstetricsData());
    }
  }, [dispatech, id]);

  useEffect(() => {
    // Set initial values for formik after obstetrics-history data is fetched
    if (obstetrics) {
      formik.setValues({
        gravidity: obstetrics.gravidity || "",
        parity: obstetrics.parity || "",
        abortion: obstetrics.abortion || "",
        notes: obstetrics.notes || "",
      });
    }
  }, [obstetrics]);

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
          to={"/General-examination"}
          className="bg-fuchsia-900 text-lg px-3 text-white rounded-lg py-2"
        >
          Search With Code
        </Link>
      </div>
    );
  }

  if (obstetrics) {
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
          to={`/patient/obstetrics-history/add/`}
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

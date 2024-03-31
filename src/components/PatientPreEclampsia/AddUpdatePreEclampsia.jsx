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
  addPreEclampsia,
  clearPreEclampsiaData,
  getPreEclampsia,
  updatePreEclampsia,
} from "../../store/slices/preEclampsiaSlice";

export default function AddUpdatePreEclampsiaHistory({ state = "update" }) {
  const { id } = useParams();
  const dispatech = useDispatch();

  const validationSchema = yup.object({
    "history_of_pre-eclampsia": yup.string().required("Required"),
    number_of_pregnancies_with_pe: yup
      .number("Must be number!")
      .moreThan(-1, "Must be more than -1!")
      .max(5, "Cannot exceed five"),
    date_of_pregnancies_with_pe: yup.array().of(yup.string()).min(0),
    fate_of_the_pregnancy: yup.string(),
  });

  const { preEclampsia, loading, error } = useSelector(
    (state) => state.preEclampsia
  );
  const patient = useSelector((state) => state.patient);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      "history_of_pre-eclampsia": preEclampsia["history_of_pre-eclampsia"]
        ? "yes"
        : "no",
      number_of_pregnancies_with_pe:
        preEclampsia.number_of_pregnancies_with_pe || "",
      date_of_pregnancies_with_pe: Array.from({ length: 5 }, () => ""),
      fate_of_the_pregnancy: preEclampsia.fate_of_the_pregnancy || "",
    },
    validationSchema,
    onSubmit: (values) => {
      values["history_of_pre-eclampsia"] =
        values["history_of_pre-eclampsia"].toLocaleLowerCase() === "yes"
          ? true
          : false;

      if (state === "update") {
        dispatech(
          updatePreEclampsia({
            id: Number(preEclampsia.id),
            data: { patient_id: id, ...values },
          })
        ).then((response) => {
          if (response.payload.examination) {
            navigate(
              `/patient/Pre-eclampsia/${response.payload.examination.patient_id}`
            );
          }
        });
      } else {
        dispatech(
          addPreEclampsia({
            data: { patient_id: patient.id, ...values },
          })
        ).then((response) => {
          if (response.payload.test) {
            navigate(
              `/patient/Pre-eclampsia/${response.payload.test.patient_id}`
            );
          }
        });
      }
    },
  });

  useEffect(() => {
    if (state === "update") {
      dispatech(getPreEclampsia({ id: Number(id) }));
    } else {
      dispatech(clearPreEclampsiaData());
    }
  }, [dispatech, id]);

  useEffect(() => {
    // Set initial values for formik after Pre-eclampsia data is fetched
    if (preEclampsia) {
      formik.setValues({
        "history_of_pre-eclampsia": preEclampsia["history_of_pre-eclampsia"]
          ? "yes"
          : "no",
        number_of_pregnancies_with_pe:
          preEclampsia.number_of_pregnancies_with_pe || "",
        date_of_pregnancies_with_pe:
          preEclampsia.date_of_pregnancies_with_pe ||
          Array.from({ length: 5 }, () => ""),
        fate_of_the_pregnancy: preEclampsia.fate_of_the_pregnancy || "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preEclampsia]);

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
          to={"/Pre-eclampsia"}
          className="bg-fuchsia-900 text-lg px-3 text-white rounded-lg py-2"
        >
          Search With Code
        </Link>
      </div>
    );
  }

  if (preEclampsia) {
    return (
      <form onSubmit={formik.handleSubmit} className="select-none">
        <div className="mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 ">
          <div className={`flex flex-col font-medium gap-1  capitalize `}>
            <label htmlFor={"history_of_pre-eclampsia"} className="text-base ">
              history of pre-eclampsia
            </label>
            <select
              value={formik.values["history_of_pre-eclampsia"]}
              name="history_of_pre-eclampsia"
              id="history_of_pre-eclampsia"
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
          <InputInfo
            form={formik}
            name={"number_of_pregnancies_with_pe"}
            title={"number of pregnancies with pe"}
            type="number"
          />

          {[
            ...Array(
              Math.min(
                5,
                Math.abs(
                  parseInt(formik.values.number_of_pregnancies_with_pe || 0)
                )
              )
            ),
          ].map((_, index) => (
            <InputInfo
              key={index}
              form={formik}
              index={index}
              name={`date_of_pregnancies_with_pe`}
              title={`Date of Pregnancy #${index + 1} with PE`}
              type="date"
            />
          ))}

          {/* <InputInfo
            form={formik}
            name={"date_of_pregnancies_with_pe"}
            title={"date of pregnancies with pe"}
            type="date"
          /> */}

          <div className={`flex flex-col font-medium gap-1  capitalize `}>
            <label htmlFor={"fate_of_the_pregnancy"} className="text-base ">
              history of pre-eclampsia
            </label>
            <select
              value={formik.values.fate_of_the_pregnancy}
              name="fate_of_the_pregnancy"
              id="fate_of_the_pregnancy"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`border outline-none px-5 py-1 border-gray-500 placeholder:text-gray-500  rounded-lg  xl:w-1/2 w-full `}
            >
              {["1 child", "> 1 child", "still birth"].map((state, index) => (
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
  } else {
    return (
      <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">
        <Link
          to={`/patient/Pre-eclampsia/add/`}
          className="rounded-lg text-white bg-blue-700 flex gap-4 px-10 py-2"
        >
          <MdAdd />
          Edit
        </Link>
      </div>
    );
  }
}

const InputInfo = ({ title, name, form, type = "text", col, index }) => {
  const handleChange = (event) => {
    const { value } = event.target;

    if (type === "date") {
      const updatedArray = [...form.values[name]];
      updatedArray[index] = value;
      form.setFieldValue(name, updatedArray);
    } else {
      form.setFieldValue(name, value);
    }
  };
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
        min={type === "number" ? "0" : null}
        max={type === "number" ? "5" : null}
        value={type === "date" ? form.values[name][index] : form.values[name]}
        onBlur={form.handleBlur}
        onChange={handleChange}
        className={`border outline-none px-5 py-1 border-gray-500 placeholder:text-gray-500  rounded-lg ${
          col ? "xl:w-1/4 lg:1/2" : "xl:w-1/2 "
        } w-full `}
        placeholder={`Insert ${title}`}
      />
    </div>
  );
};

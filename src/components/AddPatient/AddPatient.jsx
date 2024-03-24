import React, { useEffect, useState } from 'react'
import styles from "./AddPatient.module.css";
import { useFormik } from 'formik';
import * as yup from "yup"
import { useAddPatient } from '../../hooks/patient';
import { ImSpinner6 } from "react-icons/im";
import Modal from '../../Modal';
import { FaCheck } from "react-icons/fa";

export default function AddPatient() {
  const [isAdded, setIsAdded] = useState(false)
  const onSuccess = (data) => {
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
    }, 3000)
  }

  let { isLoading, mutate, isError, data, error } = useAddPatient({ onSuccess })

  const validationSchema = yup.object({
    name: yup.string().required("Name Is Requeired"),
    national_id: yup.number().required("Id Is Requeired"),
    patient_id: yup.number().required("Code Is Requeired"),
    date_of_birth: yup.string().required("Date Is Requeired"),
    age: yup.number().required("Age Is Requeired"),
    marital_state: yup.string().required("Marital Status Is Requeired"),
    address: yup.string().required("Adress Is Requeired"),
    phone_number: yup.string().required("phone Is Requeired"),
    email: yup.string().required("Email Is Requeired").email(),
    relative_phone: yup.string().required("phone Is Requeired"),
    relative_name: yup.string().required("Name Is Requeired")
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      national_id: "",
      patient_id: "",
      date_of_birth: "",
      age: "",
      marital_state: "",
      address: "",
      phone_number: "",
      email: "",
      relative_phone: "",
      relative_name: ""
    }, validationSchema, onSubmit: (values) => {
      mutate(values);
    }
  })

  useEffect(() => { console.log(data, "sada"); }, [data])

  return (
    <form onSubmit={formik.handleSubmit} className='select-none'>

      {isAdded && <Modal>
        <div className='bg-white bg-opacity-80 shadow-lg animate-bounce  rounded-2xl shadow-fuchsia-800 h-1/2 w-3/4 md:w-1/2 lg:w-2/4 xl:w-1/4 flex flex-col justify-center items-center gap-5'>
          <div className='bg-green-700 flex justify-center items-center p-5 rounded-full text-white'>
            <FaCheck size={"5rem"} />
          </div>
          <h2 className='text-xl text-gray-700 font-bold'>{data?.data?.name || "patient added"}</h2>
          <h2 className='text-xl text-green-700 font-bold'>Added successfully</h2>
        </div>
      </Modal>}

      {isError && <p className='text-xl text-red-800 font-medium bg-red-300 w-fit mx-auto px-3 py-1 rounded-xl capitalize text-center'>{error.response.data.message}</p>}

      <div className='mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 '>

        <InputInfo col={2} form={formik} name={"name"} title={"Name"} />

        <InputInfo form={formik} name={"national_id"} title={"National ID"} type='number' />

        <InputInfo form={formik} name={"patient_id"} title={"Code"} type='number' />

        <InputInfo form={formik} name={"date_of_birth"} title={"Date Of Birth"} type='date' />

        <InputInfo form={formik} name={"age"} title={"age"} type='number' />

        <div className={`flex flex-col font-medium gap-1  capitalize `}>
          <label htmlFor={"marital_state"} className='text-base '>marital state</label>
          <select
            value={formik.values.marital_state}
            name="marital_state"
            id="marital_state"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`border outline-none px-5 py-1 border-gray-500 placeholder:text-gray-500  rounded-lg  xl:w-1/2 w-full `} >
            {["Single", "Married", "Devorced"].map((state, index) => <option key={index} className='capitalize cursor-pointer' value={state}>{state}</option>)}
          </select>
        </div>

        <InputInfo form={formik} name={"address"} title={"address"} />

        <h2 className='text-fuchsia-900 my-10 text-2xl font-semibold md:col-span-2'>Contact Information</h2>

        <InputInfo form={formik} name={"phone_number"} title={"Phone number"} type='number' />
        <InputInfo form={formik} name={"email"} title={"E-mail"} type='email' />
        <InputInfo form={formik} name={"relative_phone"} title={"Home number"} type='number' />
        <InputInfo form={formik} name={"relative_name"} title={"Relative name"} />

      </div>

      <div className='flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16'>
        <button type='submit' className='rounded-lg text-white bg-fuchsia-900 flex text-base md:text-xl font-medium gap-4 px-20 py-2'>
          {isLoading ? <ImSpinner6 className='animate-spin ' size={"1.6rem"} /> : "Add"}
        </button>
      </div>
    </form>
  )
}


const InputInfo = ({ title, name, form, type = "text", col }) => {

  return <div className={`flex flex-col font-medium gap-1  capitalize ${col && `md:col-span-${col}`}`}>
    <label htmlFor={name} className='text-base '>{title}</label>
    {form.errors[name] && form.touched[name] && <p className='text-red-600 text-sm font-semibold'>{form.errors[name]}</p>}
    <input
      name={name}
      id={name}
      type={type}
      value={form.values[name]}
      onBlur={form.handleBlur}
      onChange={form.handleChange}
      className={`border outline-none px-5 py-1 border-gray-500 placeholder:text-gray-500  rounded-lg ${col ? "xl:w-1/4 lg:1/2" : "xl:w-1/2 "} w-full `}
      placeholder={`Insert ${title}`} />
  </div>
}
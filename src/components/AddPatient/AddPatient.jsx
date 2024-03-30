import React, { useEffect, useState } from 'react'
import styles from "./AddPatient.module.css";
import { useFormik } from 'formik';
import * as yup from "yup"
import { useAddPatient } from '../../hooks/patient';
import { ImSpinner6 } from "react-icons/im";
import Modal from '../../Modal';
import { FaCheck } from "react-icons/fa";
import notify from '../../utilities/alert-toastify';

export default function AddPatient() {


  const onSuccess = (data) => {
    notify("Patient Added", "success")
  }

  const onError = (error) => {
    notify(error.response.data.message, "error")
  }

  let { isLoading, mutate } = useAddPatient({ onSuccess, onError })

  const validationSchema = yup.object({
    name: yup.string().required("Name Is Requeired"),
    national_id: yup.number().required("Id Is Requeired"),
    date_of_birth: yup.string().required("Date Is Requeired"),
    age: yup.number().required("Age Is Requeired"),
    marital_state: yup.string().required("Marital Status Is Requeired"),
    address: yup.string().optional(),
    phone_number: yup.string().required("phone Is Requeired"),
    email: yup.string().email().required(),
    relative_phone: yup.string().optional(),
    relative_name: yup.string().optional()
  })

  const formik = useFormik({
    initialValues: {
      name: "",
      national_id: "",
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


  return (
    <form onSubmit={formik.handleSubmit} className='select-none'>

      <div className='mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 '>

        <InputInfo col={2} form={formik} name={"name"} title={"Name"} />

        <InputInfo form={formik} name={"national_id"} title={"National ID"} type='number' />

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
            <optgroup label='Marital State' >
              {["Single", "Married", "Devorced"].map((state, index) => <option key={index} className='capitalize cursor-pointer' value={state}>{state}</option>)}
            </optgroup>
          </select>
        </div>

        <InputInfo form={formik} name={"address"} title={"address"} />

        <h2 className='text-fuchsia-900 my-10 text-2xl font-semibold md:col-span-2'>Contact Information</h2>

        <InputInfo form={formik} name={"phone_number"} title={"Phone number"} type='number' />
        <InputInfo form={formik} name={"email"} title={"E-mail"} type='email' />
        <InputInfo form={formik} name={"relative_phone"} title={"Home number"} type='number' />
        <InputInfo form={formik} name={"relative_name"} title={"Relative name"} />

      </div>

      <div className='flex print:hidden gap-x-8 gap-y-4 justify-end  md:flex-row flex-col my-10  items-end md:items-center me-16'>
        <button type='submit'   className='rounded-lg text-white  bg-fuchsia-900 flex text-base md:text-xl font-medium gap-4 px-20 py-2'>
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
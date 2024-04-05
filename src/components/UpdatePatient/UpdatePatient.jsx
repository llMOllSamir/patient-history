import React from 'react'
import styles from "./UpdatePatient.module.css";
import { useFormik } from 'formik';
import * as yup from "yup"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUpdatePatient } from '../../hooks/patient';
import { ImSpinner6 } from "react-icons/im";
import notify from '../../utilities/alert-toastify';


export default function UpdatePatient() {
  const navigate = useNavigate()
  const { data } = useSelector(state => state.patient)


  const onSuccess = () => {
    notify("Information Updated", "success")
    navigate(`/patient/personal-information/${data.patient_code}`)
  }
  const onError = (error) => {
    notify("Information Wrong", "error")
  }
  const { isLoading: loadedUpdate, mutate } = useUpdatePatient({ onSuccess, onError })

  const validationSchema = yup.object({
    name: yup.string().required("Name Is Requeired"),
    national_id: yup.number().required("Id Is Requeired"),
    date_of_birth: yup.string().required("Date Is Requeired"),
    marital_state: yup.string().required("Marital Status Is Requeired"),
    address: yup.string(),
    phone_number: yup.string().required("phone Is Requeired"),
    email: yup.string().email(),
    relative_phone: yup.string(),
    relative_name: yup.string()
  })

  const formik = useFormik({
    initialValues: {
      name: data?.name || "",
      national_id: data?.national_id,
      marital_state: data?.marital_state || "",
      address: data?.address || "",
      phone_number: data?.phone_number || "",
      email: data?.email || "",
      relative_phone: data?.relative_phone || "",
      relative_name: data?.relative_name || "",
      date_of_birth: data?.date_of_birth || "",
    }, validationSchema, onSubmit: (values) => {
      mutate({ data: values, id: data.id });
    }
  })


  if (data) {
    return (

      <form onSubmit={formik.handleSubmit} className='select-none'>
        <div className='mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 '>
          <InputInfo col={2} form={formik} name={"name"} title={"Name"} />

          <InputInfo form={formik} name={"national_id"} title={"National ID"} type='number' />

          <InputInfo form={formik} name={"date_of_birth"} title={"Date Of Birth"} type='date' />



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
                {["Single", "Married", "Devorced"].map((state, index) => <option key={index} className='capitalize' value={state}>{state}</option>)}
              </optgroup>
            </select>
          </div>


          <InputInfo form={formik} name={"address"} title={"address"} />

          <h2 className='text-fuchsia-900 my-10 text-2xl font-semibold md:col-span-2'>Contact Information</h2>

          <InputInfo form={formik} name={"phone_number"} title={"Phone number"} />
          <InputInfo form={formik} name={"email"} title={"E-mail"} type='email' />
          <InputInfo form={formik} name={"relative_phone"} title={"Home number"} />
          <InputInfo form={formik} name={"relative_name"} title={"Relative name"} />


        </div>
        <div className='flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16'>
          <button type='submit' className='rounded-lg text-white bg-fuchsia-900 flex text-base md:text-xl font-medium gap-4 px-20 py-2'>
            {loadedUpdate ? <ImSpinner6 className='animate-spin ' size={"1.6rem"} /> : "Save"}
          </button>
        </div>
      </form>


    )
  }
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

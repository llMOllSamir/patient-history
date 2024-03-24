import React from 'react'
import styles from "./UpdatePatient.module.css";
import { useFormik } from 'formik';
import * as yup from "yup"
import { useDispatch } from 'react-redux';
import { emptyPatientCode, fixPatientCode, setPatientData } from '../../store/slices/patientSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useGetPatient, useUpdatePatient } from '../../hooks/patient';
import LoadingPatient from '../../LoadingPatient';
import { ImSpinner6 } from "react-icons/im";


export default function UpdatePatient() {
  const { id } = useParams()
  const dispatech = useDispatch()
  const navigate = useNavigate()

  // fetch data success
  const onSuccess = (data) => {
    dispatech(fixPatientCode(data.data.patient_code))
    dispatech(setPatientData(data.data))
  }

  const { isLoading, error, isError, data } = useGetPatient({ code: id, onSuccess })

  const successed = () => {
    navigate(`/patient/personal-information/${data.data.patient_code}`)
  }
  const { isLoading: loadedUpdate, mutate, isError: wrongData } = useUpdatePatient({ onSuccess: successed })

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
      name: data?.data?.name || "",
      national_id: data?.data?.national_id,
      patient_id: data?.data?.patient_code || "",
      age: data?.data?.age || "",
      marital_state: data?.data?.marital_state || "",
      address: data?.data?.address || "",
      phone_number: data?.data?.phone_number || "",
      email: data?.data?.email || "",
      relative_phone: data?.data?.relative_phone || "",
      relative_name: data?.data?.relative_name || "",
      date_of_birth: data?.data?.date_of_birth || "",
    }, validationSchema, onSubmit: (values) => {
      mutate({ data: values, id: data.data.id });
    }
  })


  if (isLoading) { return <LoadingPatient /> }
  if (isError) {
    dispatech(setPatientData(null))
    dispatech(fixPatientCode(null))

    return <div className='mx-4  text-center h-1/2 items-center justify-center   flex flex-col gap-5  '>
      <h2 className='font-bold text-red-500 text-3xl'>{error.response.data.error}</h2>
      <Link onClick={() => { dispatech(emptyPatientCode()) }} to={"/patient/personal-information"} className='bg-fuchsia-900 text-lg px-3 text-white rounded-lg py-2'>Search With Code</Link>
    </div>
  }

  if (data) {
    return (

      <form onSubmit={formik.handleSubmit} className='select-none'>
        {wrongData && <p className='bg-red-300 text-red-800 text-xl font-semibold w-fit mx-auto px-10 py-1 rounded-lg'>Some Thing Went Wrong</p>}
        <div className='mx-4 lg:mx-16  grid  grid-cols-1 md:grid-cols-2  gap-5 '>
          <InputInfo col={2} form={formik} name={"name"} title={"Name"} />

          <InputInfo form={formik} name={"national_id"} title={"National ID"} type='number' />


          <InputInfo form={formik} name={"patient_id"} title={"code"} type='number' />

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
              {["Single", "Married", "Devorced"].map((state, index) => <option key={index} className='capitalize' value={state}>{state}</option>)}
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

import React, { useState } from 'react'
import styles from "./ForgetPassword.module.css";
import { useFormik } from "formik";
import { object, string } from "yup";
import logo from "../../assets/images/image-01.png"
import { useNavigate } from 'react-router-dom';
import { useForgotPassword } from '../../hooks/auth';
import { ImSpinner6 } from "react-icons/im";
import { useDispatch } from 'react-redux';
import { setResetEmail } from '../../store/slices/authSlice';
import { Helmet } from 'react-helmet';

export default function ForgotPassword() {
  const [sendEmail, setSend] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // is loged in 
  const onSuccess = (data) => {
    setSend(true)
    dispatch(setResetEmail(formik.values.email))
    setTimeout(() => {
      navigate("/reset")
      setSend(false)
    }, 4000)
  }



  // request server 
  const { mutate, isLoading, isError, error, data } = useForgotPassword({ onSuccess })


  // Validation Schema For Forgot password
  const validationSchema = object({
    email: string("Email Is Should Be Letters")
      .required("Email is required").email(),
  });

  // handel Form 
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values)
    },
  });


  return (

    <section className={`${styles.forgot} select-none text-white`}>
      <Helmet>
        <title>
          Forgot Password
        </title>
      </Helmet>
      <article className='text-center'>
        <p className='font-normal text-lg md:text-2xl'>Welcome to</p>
        <h1 className='md:text-4xl text-3xl font-bold my-5'>Gynecological Oncology Unit</h1>
        <p className='font-normal text-lg md:text-2xl'>Mansoura University Medicine</p>
      </article>
      <form onSubmit={formik.handleSubmit} className='bg-white  p-5 py-10 rounded-xl flex flex-col gap-5 text-black justify-center items-center   md:w-2/4 w-3/4 lg:w-2/6 xl:w-1/4 ' >
        <figure>
          <img src={logo} alt="logo" />
        </figure>
        <h2 className='font-semibold text-3xl text-blue-600'>{sendEmail ? "Email sent" : "Forgot password?"}</h2>
        {isError && <p className='text-red-600 text-base font-semibold'>{error.response.data.message}</p>}
        {
          sendEmail ? <h3 className='text-gray-400 font-semibold text-center px-3'>
            {data?.data?.message}
          </h3> :
            <>
              <label htmlFor="email" className='flex text-base w-9/12 flex-col'>Enter Email
                <input onChange={formik.handleChange} id='email' onBlur={formik.handleBlur} type="email" name='email' value={formik.values.email} className='border border-gray-500 rounded-lg py-1 px-5 ' placeholder='Enter your Email' />
                {formik.errors.email && formik.touched.email && <p className='text-red-600 text-sm'>{formik.errors.email}</p>}
              </label>



              <button
                type="submit" disabled={!(formik.dirty && formik.isValid)}
                className="text-xl cursor-pointer disabled:bg-blue-950 bg-blue-600 text-white   w-3/4 flex justify-center items-center  rounded-lg py-2"
              >
                {isLoading ? <ImSpinner6 size={"1.5rem"} className='animate-spin mx-4' />
                  : "Request reset code"}
              </button></>


        }



      </form>
    </section>

  )
}

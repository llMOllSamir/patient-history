import React, { useEffect, useState } from 'react'
import styles from "./ResetPassword.module.css";
import { useFormik } from "formik";
import { object, ref, string } from "yup";
import logo from "../../assets/images/image-01.png"
import { Link, useNavigate } from 'react-router-dom';
import { useResetPassword } from '../../hooks/auth';
import { ImSpinner6 } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { setResetEmail } from '../../store/slices/authSlice';
import notify from '../../utilities/alert-toastify';

export default function ResetPassword() {
  const [passReset, setPassReset] = useState(false)
  const { resetEmail } = useSelector(state => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // is Reset Password
  const onSuccess = (data) => {
    setPassReset(true)
    notify(data.data.message, "success")
  }

  // request server 
  const { mutate, isLoading, isError, error, data } = useResetPassword({ onSuccess })


  // Validation Schema For Reset Password
  const validationSchema = object({
    email: string("Email Is Should Be Letters").required("Email is required").email(),
    token: string().required("Code is required"),
    password: string("Password Should Be Letters").required("Password is required").min(10),
    password_confirmation: string("Password Should Be Letters").required("Password is required").oneOf([ref("password")], ["password must matched"]),

  });

  // handel Form 
  const formik = useFormik({
    initialValues: {
      email: resetEmail,
      token: "",
      password: "",
      password_confirmation: ""
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values)
    },
  });

  useEffect(() => {
    if (!resetEmail) {
      navigate("/login")
    }
  }, [navigate, resetEmail])

  return (
    <section className={`${styles.reset} select-none text-white`}>
      <Helmet>
        <title>
          Reset Password
        </title>
      </Helmet>
      <article className='text-center'>
        <p className='font-normal text-lg md:text-2xl'>Welcome to</p>
        <h1 className='md:text-4xl text-3xl font-bold my-5'>Gynecological Oncology Unit</h1>
        <p className='font-normal text-lg md:text-2xl'>Mansoura University Medicine</p>
      </article>
      <form onSubmit={formik.handleSubmit} className='bg-white  p-5 py-10 rounded-xl flex flex-col gap-3 text-black justify-center items-center   md:w-2/4 w-3/4 lg:w-2/6 xl:w-1/4 ' >
        <figure>
          <img src={logo} alt="logo" />
        </figure>
        <h2 className='font-semibold text-3xl text-blue-600'>
          {passReset ? "Password changed" : "Reset password"}
        </h2>
        {isError && <p className='text-red-600 text-base font-semibold'>{error.response.data.message}</p>}
        {
          [passReset ? <>
            <h3 className='text-gray-400 font-semibold text-center px-3'>
              {data?.data?.message}
            </h3 >
            <Link to={"/login"} onClick={() => { dispatch(setResetEmail(null)) }} className="text-xl cursor-pointer disabled:bg-blue-950 bg-blue-600 text-white px-16 rounded-lg py-2">Login</Link>
          </> :
            <>
              <label htmlFor="email" className='flex text-base w-9/12 flex-col'>Enter Email
                <input onChange={formik.handleChange} id='email' onBlur={formik.handleBlur} readOnly type="email" name='email' value={formik.values.email} className='border border-gray-500 rounded-lg py-1 px-5 ' placeholder='Enter your Email' />
                {formik.errors.email && formik.touched.email && <p className='text-red-600 text-sm'>{formik.errors.email}</p>}
              </label>

              <label htmlFor="token" className='flex text-base w-9/12 flex-col'>Enter Reset Code
                <input onChange={formik.handleChange} id='token' onBlur={formik.handleBlur} type="text" name='token' value={formik.values.token} className='border border-gray-500 rounded-lg py-1 px-5 ' placeholder='Enter  Code' />
                {formik.errors.token && formik.touched.token && <p className='text-red-600 text-sm'>{formik.errors.token}</p>}
              </label>

              <label htmlFor="password" className='flex text-base w-9/12 flex-col'>New password
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} id='password' type="password" name='password' value={formik.values.password} className='border border-gray-500 rounded-lg py-1 px-5 ' placeholder='Enter your password' />
                {formik.errors.password && formik.touched.password && <p className='text-red-600 text-sm'>{formik.errors.password}</p>}
              </label>

              <label htmlFor="password_confirmation" className='flex text-base w-9/12 flex-col'>Confirm Password
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} id='password_confirmation' type="password" name='password_confirmation' value={formik.values.password_confirmation} className='border border-gray-500 rounded-lg py-1 px-5 ' placeholder='Confirm Password' />
                {formik.errors.password_confirmation && formik.touched.password_confirmation && <p className='text-red-600 text-sm'>{formik.errors.password_confirmation}</p>}
              </label>

              <button
                type="submit" disabled={!(formik.dirty && formik.isValid)}
                className="text-xl cursor-pointer disabled:bg-blue-950 bg-blue-600 text-white px-16 rounded-lg py-2"
              >
                {isLoading ? <ImSpinner6 size={"1.5rem"} className='animate-spin mx-4' />
                  : "Reset"}
              </button></>

          ]

        }


      </form>
    </section >

  )
}

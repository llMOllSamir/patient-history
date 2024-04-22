import React, { useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import { object, string } from "yup";
import logo from "../../assets/images/image-01.png";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/auth";
import { ImSpinner6 } from "react-icons/im";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { Helmet } from "react-helmet";

export default function Login() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // is loged in
  const onSuccess = (data) => {
    dispatch(login(data.data.token));
    localStorage.setItem("token", data.data.token);
    setError(null);
    navigate("/");
  };

  const onError = (err) => {
    setError(err.response.data.message);
  };
  // request server
  const { mutate, isLoading } = useLogin({ onSuccess, onError });

  // Validation Schema For Loging
  const validationSchema = object({
    email: string("Email Is Should Be Letters")
      .required("Email is required")
      .email(),
    password: string("Password Should Be Letters").required(
      "Password is required"
    ),
  });

  // handel Form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <section className={`${styles.login} select-none text-white`}>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <article className="text-center">
        <p className="font-normal text-lg md:text-2xl">Welcome to</p>
        <h1 className="md:text-4xl text-3xl font-bold my-5">
          Gynecological Oncology Unit
        </h1>
        <p className="font-normal text-lg md:text-2xl">
          Mansoura University Medicine
        </p>
      </article>
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white  p-5 py-10 rounded-xl flex flex-col gap-5 text-black justify-center items-center   md:w-2/4 w-3/4 lg:w-2/6 xl:w-1/4 "
      >
        <figure>
          <img src={logo} alt="logo" />
        </figure>
        <h2 className="font-semibold text-3xl text-blue-600">Login Account</h2>
        {error && (
          <p className="text-red-600 text-base font-semibold">{error}</p>
        )}
        <label htmlFor="email" className="flex text-base w-9/12 flex-col">
          Enter Email
          <input
            onChange={formik.handleChange}
            id="email"
            onBlur={formik.handleBlur}
            type="email"
            name="email"
            value={formik.values.email}
            className="border border-gray-500 rounded-lg py-1 px-5 "
            placeholder="Enter your Email"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-600 text-sm">{formik.errors.email}</p>
          )}
        </label>

        <label htmlFor="password" className="flex text-base w-9/12 flex-col">
          Enter Password
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="password"
            type="password"
            name="password"
            value={formik.values.password}
            className="border border-gray-500 rounded-lg py-1 px-5 "
            placeholder="Enter your password"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-600 text-sm">{formik.errors.password}</p>
          )}
        </label>

        <label className="-mt-4 text-sm  w-9/12  text-gray-500 ">
          Forget Password?
          <Link
            className="text-black hover:border-b  border-black font-semibold"
            to={"/forgotpassword"}
          >
            Reset
          </Link>
        </label>

        <button
          type="submit"
          disabled={!(formik.dirty && formik.isValid)}
          className="text-xl cursor-pointer disabled:bg-blue-950 bg-blue-600 text-white px-16 rounded-lg py-2"
        >
          {isLoading ? (
            <ImSpinner6 size={"1.5rem"} className="animate-spin mx-4" />
          ) : (
            "Log In"
          )}
        </button>
      </form>
    </section>
  );
}

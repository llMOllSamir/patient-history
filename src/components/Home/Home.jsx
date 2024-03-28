import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useFormik } from "formik";
import { number, object } from "yup";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-transparent.svg";
import { VscDiffAdded } from "react-icons/vsc";
import { IoMenu } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useLogout } from "../../hooks/auth";
import { logout } from "../../store/slices/authSlice";
import {
  emptyPatientCode,
  emptyPatientID,
} from "../../store/slices/patientSlice";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  dispatch(emptyPatientCode());
  dispatch(emptyPatientID());

  const onSuccess = () => {
    dispatch(logout());
    navigate("/login");
  };
  const { refetch } = useLogout({ onSuccess });

  // vaidation schema
  const validationSchema = object({
    search: number("Code must be a number").required("Code is required").min(1),
  });

  // handle form
  const formik = useFormik({
    initialValues: {
      search: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (user) {
        navigate(`/patient/personal-information/${values.search}`);
      } else {
        navigate(`/login`);
      }
    },
  });

  return (
    <section className={`${styles.home} text-white `}>
      <div className="fixed inset-0 bg-transparent h-40 flex justify-between  lg:px-32 md:px-10 ">
        <img src={logo} alt="Logo" className="w-100" />
        <div className="btn md:flex hidden justify-center items-center  gap-10  ">
          {user !== null ? (
            <>
              <Link
                className="border rounded-lg px-5 py-2 flex items-center justify-center gap-3"
                to={"/patient/personal-information/new-patient"}
              >
                <VscDiffAdded size={"1.5rem"} /> Add Patient
              </Link>
              <button
                className="border rounded-lg px-5 py-2 flex items-center justify-center gap-3"
                onClick={refetch}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                className="border rounded-lg px-5 py-2 flex items-center justify-center gap-3"
                to={"/login"}
              >
                Login
              </Link>
            </>
          )}
        </div>

        <div className="menu md:hidden relative flex justify-center items-center mx-16 ">
          <IoMenu
            size={"2rem"}
            cursor={"pointer"}
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          />
          <aside
            className={`fixed inset-0  w-0 overflow-hidden py-5   text-black flex flex-col ${
              menuOpen ? styles.fadeInSlide : styles.fadeOutSlide
            }   justify-start items-start px-5   bg-white`}
          >
            <IoMdClose
              className="ms-auto "
              size={"1.5rem"}
              cursor={"pointer"}
              onClick={() => {
                setMenuOpen(!menuOpen);
              }}
            />
            {user !== null ? (
              <button onClick={refetch}>Logout</button>
            ) : (
              <Link className="" to={"/login"}>
                Login
              </Link>
            )}
          </aside>
        </div>
      </div>

      <div className={` ${styles.form} text-center w-full `}>
        <h1 className="md:text-5xl text-4xl font-semibold">
          Search for patient
        </h1>
        <p className="md:text-2xl text-lg font-light mt-5">
          Lorem ipsum is a dummy text
        </p>
        <form onSubmit={formik.handleSubmit} className=" w-full my-8">
          <label
            htmlFor="search"
            className="bg-blue-600 rounded-xl mb-4 w-3/4 md:w-4/6 lg:w-3/6 xl:w-2/6 mx-auto flex justify-between items-center  "
          >
            <input
              onBlur={formik.handleBlur}
              name="search"
              value={formik.values.search}
              onChange={formik.handleChange}
              type="text"
              id="search"
              className="  rounded-s-xl text-black grow outline-none text-xl py-2 px-5"
              placeholder="inter patient code"
            />
            <div className="px-10 flex justify-center items-center">
              {" "}
              <CiSearch size={"2rem"} />
            </div>
          </label>
          {formik.errors.search && formik.touched.search && (
            <p className="text-red-600 text-lg">{formik.errors.search}</p>
          )}
          <input
            type="submit"
            className="bg-blue-600 mt-4 cursor-pointer px-10 py-1 rounded-xl"
            value={"Search by code"}
          />
        </form>
      </div>
    </section>
  );
}

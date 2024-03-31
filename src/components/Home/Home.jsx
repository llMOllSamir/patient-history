import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useFormik } from "formik";
import { number, object } from "yup";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo-transparent.svg";
import { VscDiffAdded } from "react-icons/vsc";
import { IoMenu } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
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

  useEffect(() => {
    dispatch(emptyPatientCode());
    dispatch(emptyPatientID())
  }, [dispatch])

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
      navigate(`/patient/personal-information/${values.search}`);
    },
  });

  return (
    <section className={`${styles.home} text-white select-none `}>
      <div className="fixed inset-0 xl:mt-16 mt-5 bg-transparent h-40 flex justify-between items-center  lg:px-32 md:px-10 ">
        <img src={logo} alt="Logo" className="w-2/6 sm:w-3/12 xl:w-2/12    aspect-square" />
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

        <div className=" md:hidden  relative inline mx-16 ">
          <IoMenu
            size={"2rem"}
            cursor={"pointer"}
            onClick={() => {
              setMenuOpen(!menuOpen);
            }}
          />
          {menuOpen &&
            <nav
              className={`absolute  top-full end-full  overflow-hidden w-48 h-0 py-0  rounded-2xl font-medium ${styles.dropdown}  gap-2  text-black flex flex-col justify-center items-center     bg-white`}
            >
              {user !== null ? (
                <>
                  <button className="  hover:bg-gray-400 flex justify-center py-1  w-full  " onClick={refetch}>Logout</button>
                  <Link
                    className="  w-full flex justify-center hover:bg-gray-400  py-1  items-center gap-3 "
                    to={"/patient/personal-information/new-patient"}
                  >
                    <VscDiffAdded size={"1.5rem"} /> Add Patient
                  </Link>
                </>
              ) : (
                <Link className="  hover:bg-gray-400 flex justify-center py-1  w-full  " to={"/login"}>
                  Login
                </Link>
              )}
            </nav>
          }

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
              placeholder="Enter patient code"
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

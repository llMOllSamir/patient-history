import React from "react";
import styles from "./NotFound.module.css";
import logo from "../../assets/images/logo-transparent.svg"
import { Link } from "react-router-dom";
export default function NotFound() {
  return <section className="w-full text-center  min-h-screen bg-fuchsia-800 flex flex-col justify-center items-center">
    <img src={logo} alt="" className="w-2/4 md:w-1/4  lg:w-1/4 xl:2/6 sm:w-1/2  xl:w-1/4  " />
    <h2 className="text-orange-300 lg:text-3xl font-medium text-xl">Welcome To</h2>
    <h1 className="text-white font-extrabold text-3xl my-3 lg:text-5xl">Gynecological Oncology Unit</h1>
    <h2 className="text-orange-300 lg:text-3xl font-medium text-xl">Mansoura University Medicine</h2>
    <Link to={"/"} className="text-white my-5 px-10 py-2 bg-fuchsia-900 font-semibold  rounded-xl">Home</Link>
  </section>
}

import React, { useEffect } from 'react'
import styles from "./PatientLayout.module.css";
import SlideNav from '../SlideNav/SlideNav';
import { useDispatch } from "react-redux";
import { Outlet } from 'react-router-dom';
import { fixPatientCode, setPatientData } from '../../store/slices/patientSlice';

export default function PatientLayout() {
  const dispatch = useDispatch()
  useEffect(() => {
    if (localStorage.getItem("patientData")) {
      dispatch(setPatientData(JSON.parse(localStorage.getItem("patientData"))))
    }
    if (localStorage.getItem("patientCode")) {
      dispatch(fixPatientCode(JSON.parse(localStorage.getItem("patientCode"))))
    }
  }, [dispatch])

  return (
    <section className='min-h-screen flex  items-stretch '>
      <SlideNav />
      <Outlet />
    </section>
  )
}

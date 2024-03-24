import React from 'react'
import styles from "./PatientLayout.module.css";
import SlideNav from '../SlideNav/SlideNav';
import { Outlet } from 'react-router-dom';

export default function PatientLayout() {
  return (
    <section className='min-h-screen flex  items-stretch '>
      <SlideNav />
      <Outlet />
    </section>
  )
}

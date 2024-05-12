import React from 'react'
import styles from "./DashboredHeader.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../store/slices/authSlice';
import { useLogout } from '../../hooks/auth';

export default function DashboredHeader() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const onSuccess = () => {
    dispatch(logout())
    navigate("/login")
  }
  const { refetch } = useLogout({ onSuccess })
  return (
    <>
      {user && <header className='w-full print:hidden grow relative z-50 bg-fuchsia-900 text-white  h-20 mb-10 flex justify-end items-center px-10 gap-5  '>
        <h2 className=' capitalize text-lg select-none decoration-2 underline underline-offset-4  font-bold'>Dr.{user?.name.split(" ").slice(0, 2).join(" ") || ""}</h2>
        <button onClick={refetch} className='border border-white px-8 rounded-xl py-1'>Log Out</button>
      </header>}</>
  )
}

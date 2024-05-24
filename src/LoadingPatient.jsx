
import React from 'react'
import logo from "./assets/images/logo-white.svg"
export default function LoadingPatient() {
    return (
        <div className='fixed inset-0  flex items-center justify-center'>
            <img src={logo} alt="logo" className='w-48 md:ms-24 animate-pulse' />
        </div>
    )
}


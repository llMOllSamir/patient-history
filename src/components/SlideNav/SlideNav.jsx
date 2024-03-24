import React from 'react'
import { Link, NavLink, useLocation, useParams } from 'react-router-dom';
import logo from '../../assets/images/logo-transparent.svg'
import * as svgs from '../SVG/svgTags';
import { useSelector } from 'react-redux';

export default function SlideNav() {

  const handlePrint = () => {
    window.print()
  }

  const { patientCode, data } = useSelector(state => state.patient)

  const { pathname } = useLocation()

  const links = [
    { title: "Personal Information", ref: "personal-information", logo: svgs.Information },
    { title: "General Examination", ref: "General-examination", logo: svgs.Examination },
    { title: "Gynecological history", ref: "gynecological-history", logo: svgs.Gynecological },
    { title: "Obstetrics history", ref: "obstetrics-history", logo: svgs.Obstetrics },
  ]
  const oncology = [
    { title: "Cervical Cancer", ref: "cervical", logo: svgs.Cervical },
    { title: "Breast Cancer", ref: "breast", logo: svgs.Breast },
    { title: "Ovarian Cancer", ref: "ovarian", logo: svgs.Ovarian },
    { title: "Uterine Cancer", ref: "uterine", logo: svgs.Uterine },
  ]

  return (

    <aside className=' select-none    print:hidden md:w-2/6 xl:w-3/12 2xl:w-1/6 lg:w-3/12 w-2/5 bg-fuchsia-900  text-white'>

      {data && !pathname.endsWith("add") ? <div className='flex justify-center w-full md:3/4 xl:w-5/6 mx-auto flex-col gap-1 items-center my-12'>
        <svgs.Profile />
        <h2 className='text-2xl font-semibold mt-4'>{data.name.split(" ").slice(0, 2).join(" ")}</h2>
        <p className='text-sm font-normal text-orange-300'>{patientCode}</p>
        <button onClick={handlePrint} type='button' className='text-xs font-medium bg-fuchsia-950 px-5 py-1 rounded-xl text-gray-400'>Print ID card</button>
      </div> :
        <Link to={"/"}><img className='w-full sm:w-2/4 md:w-2/4 lg:w-3/4 xl:w-3/6 mb-12 mx-auto mt-10' src={logo} alt='logo' /></Link>}

      <nav className='w-full'>
        <ul className='flex flex-col gap-y-2 items-center justify-start'>
          {links.map((link, index) => <li className='  py-2 w-full has-[.active]:bg-white font-medium has-[.active]:text-fuchsia-900 sm:px-10' key={index}>
            <NavLink className={`flex justify-start items-center gap-2`} to={link.ref}>
              <link.logo fill={pathname.includes(link.ref) ? "#773479" : "white"} />
              {link.title}</NavLink>
          </li>)}
          <li className=' flex justify-start  w-full' >
            <ul className='w-full'  >
              <p className='block sm:px-10 text-start w-full my-2 font-bold text-xl'>Oncology</p>
              {oncology.map((link, index) => <li className='md:px-8 lg:px-10 py-2 w-full has-[.active]:bg-white font-medium has-[.active]:text-fuchsia-900 ' key={index}>
                <NavLink className={`flex justify-center items-center gap-2`} to={link.ref}>
                  <link.logo fill={pathname.includes(link.ref) ? "#773479" : "white"} />
                  {link.title}</NavLink>
              </li>)}
            </ul >
          </li>
          <li className='sm:px-10  py-2 w-full has-[.active]:bg-white font-medium has-[.active]:text-fuchsia-900 '>
            <NavLink className={`flex justify-start items-center gap-2`} to={"Osteoporisis"}>
              <svgs.Osteoporisis fill={pathname.includes("Osteoporisis") ? "#773479" : "white"} />
              Osteoporisis</NavLink></li>
          <li className='sm:px-10 py-2 w-full has-[.active]:bg-white font-medium has-[.active]:text-fuchsia-900 '>
            <NavLink className={`flex justify-start items-center gap-2`} to={"Pre-eclampsia"}>
              <svgs.Eclampsia fill={pathname.includes("Pre-eclampsia") ? "#773479" : "white"} />
              Pre-eclampsia</NavLink></li>
        </ul>

      </nav>
    </aside>
  )
}

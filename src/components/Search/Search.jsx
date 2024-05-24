import React, { useCallback, useEffect, useRef, useState } from 'react'
import styles from "./Search.module.css";
import { useSearchPatients } from '../../hooks/search';
import LoadingPatient from '../../LoadingPatient';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [filterData, setFilter] = useState(null)
  const [changing, setChanging] = useState(null)
  const navigate = useNavigate()
  const searchInput = useRef()
  const { isLoading, data } = useSearchPatients()


  const filtration = useCallback(() => {

    if (filterData) {
      return data.data.filter(patient => patient.name.toLowerCase().includes(filterData.toLowerCase()));
    }
    return data.data

  }, [filterData, data])

  useEffect(() => {
    if (changing?.length > 0 && changing !== null) {
      setFilter(changing)
    } else {
      setFilter(null)
    }
  }, [changing])

  if (isLoading) { return < LoadingPatient /> }

  return (
    <>
      <section className='md:px-10'>


        <input
          ref={searchInput}
          onInput={() => { setChanging(searchInput.current.value) }} type="text"
          placeholder='Search By Name'
          id='searchByName'
          className='outline-none flex mx-auto w-full lg:w-3/4 border-2 border-fuchsia-900 rounded-xl px-5 py-1'
        />



        <div className='w-full lg:w-full xl:w-3/4 mx-auto mt-10  md:p-5 '>
          <table className='text-center capitalize select-none w-full   divide-fuchsia-900 divide-y-2    '>
            <tr className='bg-gray-200 h-10' >
              <th className='w-1/4 text-base lg:text-xl'>Name</th>
              <th className='w-1/4 text-base lg:text-xl'>Code</th>
              <th className='w-1/4 text-base lg:text-xl'>Age</th>
              <th className='w-1/4 text-base lg:text-xl hidden md:table-cell'>Phone</th>

            </tr>
            {data && filtration().map(patient =>
              <tr
                key={patient.id}
                onClick={() => { navigate(`/patient/personal-information/${patient.patient_code}`) }}
                className='odd:bg-gray-200 h-10 hover:bg-gray-700 hover:text-white cursor-pointer transition-all '>
                <td>{patient.name.split(" ").splice(0, 3).join(" ")}</td>
                <td>{patient.patient_code}</td>
                <td>{patient.age}</td>
                <td className='hidden md:table-cell'>{patient.relative_phone}</td>
              </tr>)}
          </table>
        </div>
      </section >

    </>
  )
}

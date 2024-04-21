import React, { useEffect } from 'react'
import styles from "./GynecologicalHistory.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { FiDownload } from "react-icons/fi";
import { MdEdit } from "react-icons/md";
import LoadingPatient from "../../LoadingPatient";
import { Link, useParams } from "react-router-dom";
import { useGynecologicalHistory } from '../../hooks/gynecologicalHistory';
import { addGynecologicalHistoryData } from '../../store/slices/gynecologicalHistorySlice';

export default function GynecologicalHistory() {
  const { user } = useSelector(state => state.auth)
  const { id } = useParams();
  const dispatch = useDispatch()
  const onSuccess = (data) => {
    dispatch(addGynecologicalHistoryData(data.data))
  }
  const { isLoading, data, error, isError } = useGynecologicalHistory({ id, onSuccess })




  if (isLoading) { return <LoadingPatient /> }

  if (isError) {
    return (
      <div className="mx-4  text-center h-1/2 items-center justify-center   flex flex-col gap-5  ">
        <h2 className="font-bold text-red-500 text-lg md:text-3xl">{error.response.data.error}</h2>
        <Link
          to={"/patient/gynecological-history/add"}
          className="bg-fuchsia-900 text-sm md:text-lg px-3 text-white rounded-lg py-2 flex gap-3 items-center"
        >
          <MdEdit />   New Gynecological History
        </Link>
      </div>
    );
  }

  return (
    data && data?.data && <>
      <section className='lg:ms-20 ms-4 grid grid-cols-1 md:grid-cols-2 gap-8 select-none'>
        <article className='flex flex-col gap-2 col-span-2'>
          <h2 className='font-medium text-2xl'>Date of last period</h2>
          <p className='text-xl font-semibold text-gray-500'>{data.data.date_of_last_period}</p>
        </article>

        <article className='flex flex-col gap-2'>
          <h2 className='font-medium text-2xl'>Menstrual cycle abnormalities</h2>
          <p className='text-xl font-semibold text-gray-500'>{data.data.menstrual_cycle_abnormalities}</p>
        </article>

        <article className='flex flex-col gap-2'>
          <h2 className='font-medium text-2xl'>Contact bleeding</h2>
          <div className='flex flex-col gap-1'>
            <label htmlFor="ContactYes"><input type="radio" className='checkedInput' checked={data.data.contact_bleeding === 1} name="Contact" value={"yes"} readOnly id="ContactYes" /> Yes</label>
            <label htmlFor="ContactcNo"><input type="radio" className='checkedInput' checked={data.data.contact_bleeding === 0} name="Contact" value={"no"} readOnly id="ContactcNo" /> No</label>
          </div>
        </article>

        <article className={`flex flex-col gap-2 ${data.data.menopause === 0 && "col-span-2"}`}>
          <h2 className='font-medium text-2xl'>Menopause</h2>
          <div className='flex flex-col gap-1'>
            <label htmlFor="MenopauseYes"><input type="radio" className='checkedInput' checked={data.data.menopause === 1} name="Menopause" value={"yes"} readOnly id="MenopauseYes" /> Yes</label>
            <label htmlFor="MenopauseNo"><input type="radio" className='checkedInput' checked={data.data.menopause === 0} name="Menopause" value={"no"} readOnly id="MenopauseNo" /> No</label>
          </div>
        </article>

        {data.data.menopause === 1 &&
          <article className='flex flex-col gap-2'>
            <h2 className='font-medium text-2xl'>If yes , mention Age</h2>
            <p className='text-xl font-semibold text-gray-500'>{data.data.menopause_age}</p>
          </article>

        }

        <article className={`flex flex-col gap-2 ${data.data.using_of_contraception === 0 && "col-span-2"}`}>
          <h2 className='font-medium text-2xl'>Using of contraception</h2>
          <div className='flex flex-col gap-1'>
            <label htmlFor="contraceptionYes"><input type="radio" className='checkedInput' checked={data.data.using_of_contraception === 1} name="contraception" value={"yes"} readOnly id="contraceptionYes" /> Yes</label>
            <label htmlFor="contraceptionNo"><input type="radio" className='checkedInput' checked={data.data.using_of_contraception === 0} name="contraception" value={"no"} readOnly id="contraceptionNo" /> No</label>
          </div>
        </article>

        {data.data.using_of_contraception === 1 &&
          <article className='flex flex-col gap-2'>
            <h2 className='font-medium text-2xl'>If yes , mention the method</h2>
            <p className='text-xl font-semibold text-gray-500'>{data.data.contraception_method || data.data.other_contraception_method}</p>
          </article>
        }





      </section>

      <div className="flex print:hidden gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">
        {user && user.role === "doctor" &&
          <Link
            to={`/patient/gynecological-history/update`}
            className="rounded-lg text-white bg-blue-700 flex gap-4 px-10 py-2"
          >
            <MdEdit />
            Edit
          </Link>

        }

        <button
          className="rounded-lg text-white bg-fuchsia-900 flex gap-4 px-10 py-2"
          onClick={() => {
            window.print();
          }}
        >
          <FiDownload />
          Download a copy
        </button>
      </div>
    </>



  )
}

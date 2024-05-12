import React, { useState } from 'react'
import styles from "./PatientCervicalCancer.module.css";
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCervix } from '../../hooks/cervical';
import LoadingPatient from '../../LoadingPatient';
import NoDataFound from '../NoDataFound/NoDataFound';
import notify from '../../utilities/alert-toastify';
import { setCervicalData } from '../../store/slices/cervicalSlice';
import { MdEdit } from 'react-icons/md';
import { FiDownload } from 'react-icons/fi';

export default function PatientCervicalCancer() {
  const { id } = useParams()
  const [file, setFile] = useState(null)
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const onSuccess = (data) => {
    dispatch(setCervicalData(data.data))
  }
  const onError = () => {
    notify("Something Went Wrong", "error")
  }
  const { data, isLoading, isError, error } = useGetCervix({ id, onSuccess, onError })


  if (isLoading) {
    return <LoadingPatient />;
  }

  if (isError) {
    return (
      <div className="mx-4  text-center h-1/2 items-center justify-center   flex flex-col gap-5  ">
        <h2 className="font-bold text-red-500 text-3xl">{error.response.data.error}</h2>
        <Link
          to={"/patient/cervical/add"}
          className="bg-fuchsia-900 text-lg px-3 text-white rounded-lg py-2"
        >
          Add New cervical Cancer Examination
        </Link>
      </div>
    );
  }


  if (data.data && Object.keys(data.data).length === 0) {
    return <NoDataFound link="cervical" title="cervical Cancer" />
  }

  if (data.data && Object.keys(data.data).length > 0) {
    return (
      <div className="select-none items-center grid gap-y-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 md:px-10 lg:px-16" >
        <div className='lg:col-span-3 md:col-span-2 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 '>
          <div>
            <p className='font-medium'>HPV Vaccine</p>
            <div className='border-2 border-gray-400 flex flex-col gap-3  lg:w-3/4 my-3 xl:w-1/2 rounded-xl p-4'>
              <label htmlFor="hpv_vaccineYes" className='flex gap-3 font-medium'>
                <input readOnly checked={data.data.hpv_vaccine === 1} type="radio" className='checkedInput' value={"yes"} name="hpv_vaccine" id="hpv_vaccineYes" />
                Yes
              </label>
              <label htmlFor="hpv_vaccineNo" className='flex gap-3 font-medium'>
                <input readOnly checked={data.data.hpv_vaccine === 0} type="radio" className='checkedInput' value={"no"} name="hpv_vaccine" id="hpv_vaccineNo" />
                No
              </label>
            </div>
          </div>
        </div>

        <div className='md:col-span-3 lg:col-span-2 flex flex-col gap-5  capitalize overflow-auto'>
          <table className='border-collapse w-full md:w-10/12  lg:w-5/6  xl:w-3/4 '>
            <tr>
              <th></th>
              <th className='border-2 bg-gray-300 border-blue-600 '>Result</th>
              <th className='border-2 bg-gray-300 border-blue-600 '>Comments</th>
            </tr>
            <tr>
              <td className='border-2 w-1/4 text-xl font-semibold text-center py-3 bg-gray-300 border-blue-600 ' >VIA Test</td>
              <td className={`  bg-fuchsia-200   border-2  border-blue-600 `} >
                <input
                  className={` bg-transparent w-full outline-none  px-5 placeholder:text-red-600 `}
                  type="text"
                  value={data.data.via_test_result}
                  name="via_test_result"
                  id="via_test_result" />
              </td>
              <td className={`bg-fuchsia-200 border-2  border-blue-600 `} >
                <input
                  className='bg-transparent w-full outline-none px-5 placeholder:text-red-600'
                  type="text"
                  value={data.data.via_test_comment}
                  name="via_test_comment"
                  id="via_test_comment" />
              </td>
            </tr>
          </table>

          <table className='border-collapse w-full md:w-10/12 lg:w-5/6 xl:w-3/4 '>
            <tr>
              <th></th>
              <th className='border-2 bg-gray-300 border-blue-600 '>Result</th>
              <th className='border-2 bg-gray-300 border-blue-600 '>Comments</th>
            </tr>
            <tr>
              <td className='border-2 w-1/4 text-xl font-semibold text-center py-3 bg-gray-300 border-blue-600 ' >Pap smear</td>
              <td className={`  bg-fuchsia-200  border-2  border-blue-600 `} >
                <input
                  className='bg-transparent w-full outline-none px-5 placeholder:text-red-600'
                  type="text"
                  value={data.data.pap_smear_result}
                  name="pap_smear_result"
                  id="pap_smear_result" /></td>
              <td className={`  bg-fuchsia-200  border-2  border-blue-600 `} >
                <input
                  className='bg-transparent w-full outline-none px-5 placeholder:text-red-600'
                  type="text"
                  value={data.data.pap_smear_comment}
                  name="pap_smear_comment"
                  id="pap_smear_comment" />
              </td>
            </tr>
          </table>
        </div>

        <textarea
          name="recommendations"
          className={`w-full border-2 col-span-1  border-gray-300  resize-none p-5 outline-none rounded-xl`}
          rows={8}
          readOnly
          value={data.data.recommendations}
          id="recommendations" />


        <div className="flex print:hidden col-span-1  md:col-span-3 gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">
          {user && user.role === "doctor" &&
            <Link
              to={`/patient/cervical/update`}
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


      </div>
    )
  }
}

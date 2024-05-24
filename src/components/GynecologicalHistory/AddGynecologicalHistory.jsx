
import React from 'react'
import styles from "./GynecologicalHistory.module.css";
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useAddGynecologicalHistory } from '../../hooks/gynecologicalHistory';
import { ImSpinner6 } from 'react-icons/im';
import { useFormik } from "formik";
import * as yup from "yup";

export default function AddGynecologicalHistory() {
  const navigate = useNavigate()
  const { data: patient } = useSelector(state => state.patient)
  const onSuccess = () => { navigate(`/patient/gynecological-history/${patient?.id}`) }
  const { isLoading, mutate, isError, error } = useAddGynecologicalHistory({ id: patient?.id, onSuccess })

  const validationSchema = yup.object({
    patient_id: yup.number(),
    date_of_last_period: yup.string().required(),
    menstrual_cycle_abnormalities: yup.string().required(),
    contact_bleeding: yup.string().required(),
    menopause: yup.string().required(),
    menopause_age: yup.number().when('menopause', {
      is: (value) => value === "true",
      then: (schema) => schema.required("Insert Age"),
    }),
    using_of_contraception: yup.string().required(),
    contraception_method: yup.string().when('using_of_contraception', {
      is: (value) => value === "yes",
      then: (schema) => schema.required("Choose Method"),
    }),
    other_contraception_method: yup.string().when('contraception_method', {
      is: (value) => value === "Other",
      then: (schema) => schema.required("Insert Method"),
    }),
  })



  const formik = useFormik({
    initialValues: {
      patient_id: patient.id,
      date_of_last_period: "",
      menstrual_cycle_abnormalities: "",
      contact_bleeding: "",
      menopause: "",
      menopause_age: "",
      using_of_contraception: "",
      contraception_method: "",
      other_contraception_method: ""
    },
    validationSchema,
    onSubmit: (values) => {
      const data = {
        ...values,
        contact_bleeding: values.contact_bleeding === "yes" ? true : false,
        menopause: values.menopause === "yes" ? true : false,
        using_of_contraception: values.using_of_contraception === "yes" ? true : false,
      }
      mutate(data);
    }
  })

  if (isError) {
    console.log(error);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='lg:ms-20 mx-4 grid grid-cols-1 md:grid-cols-2 items-start gap-8 select-none'>

        <div className='flex flex-col gap-2  md:col-span-2 '>
          <label htmlFor="date">Date of last period</label>
          <input
            name='date_of_last_period'
            value={formik.values.date_of_last_period}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            id='date'
            type="date"
            className='outline-none md:w-1/2 xl:w-1/4 px-2 py-1 rounded-lg select-none  border border-gray-400' />
          {formik.touched.date_of_last_period && formik.errors.date_of_last_period && <span className='text-red-600 font-medium text-sm'>{formik.errors.date_of_last_period}</span>}

        </div>

        <div className='flex flex-col gap-2    '>
          <label htmlFor="abnormalities"> Menstrual cycle abnormalities</label>
          <input
            id='abnormalities'
            name='menstrual_cycle_abnormalities'
            value={formik.values.menstrual_cycle_abnormalities}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="tel" className='outline-none md:w-3/4 lg:w-1/2 xl:w-1/2 px-2 py-1 rounded-lg select-none  border border-gray-400' />
          {formik.touched.menstrual_cycle_abnormalities && formik.errors.menstrual_cycle_abnormalities && <span className='text-red-600 font-medium text-sm'>{formik.errors.menstrual_cycle_abnormalities}</span>}
        </div>

        <div className='flex flex-col gap-3 '>
          <label htmlFor="">Contact bleeding</label>
          <div className='flex flex-col gap-2 border border-gray-400 rounded-xl p-2 md:w-3/4 lg:w-1/2 xl:w-2/4 2xl:w-1/4 '>
            <label htmlFor="ContactYes" className='flex gap-2 text-sm '>
              <input
                name='contact_bleeding'
                value={true}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio" className='checkedInput' id="ContactYes" />
              Yes
            </label>
            <label htmlFor="ContactNo" className='flex gap-2 text-sm '>
              <input
                name='contact_bleeding'
                value={false}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio" className='checkedInput' id="ContactNo" />
              No
            </label>
          </div>
          {formik.touched.contact_bleeding && formik.errors.contact_bleeding && <span className='text-red-600 font-medium text-sm'>{formik.errors.contact_bleeding}</span>}

        </div>

        <div className={`flex flex-col gap-3 ${formik.values.menopause !== "true" && "md:col-span-2 md:w-1/2"}`}>
          <label htmlFor="">Menopause</label>
          <div className='flex flex-col gap-2 border border-gray-400 rounded-xl p-2 md:w-3/4 lg:w-1/2 xl:w-2/4 2xl:w-1/4 '>
            <label htmlFor="MenopauseYes" className='flex gap-2 text-sm '>
              <input
                name='menopause'
                value={true}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio" className='checkedInput' id="MenopauseYes" />
              Yes
            </label>
            <label htmlFor="MenopauseNo" className='flex gap-2 text-sm '>
              <input
                name='menopause'
                value={false}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio" className='checkedInput' id="MenopauseNo" />
              No
            </label>
          </div>
          {formik.touched.menopause && formik.errors.menopause && <span className='text-red-600 font-medium text-sm'>{formik.errors.menopause}</span>}

        </div>
        {
          formik.values.menopause === "true" && <div className='flex flex-col gap-2 '>
            <label htmlFor="">If yes , mention Age</label>
            <input
              name='menopause_age'
              value={formik.values.menopause_age}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              placeholder='Enter Age' type="tel" className='outline-none lg:w-1/2   px-2 py-1 rounded-lg select-none  border border-gray-400' />
            {formik.touched.menopause_age && formik.errors.menopause_age && <span className='text-red-600 font-medium text-sm'>{formik.errors.menopause_age}</span>}
          </div>

        }


        <div className={`flex flex-col gap-3 ${formik.values.using_of_contraception !== "yes" && "md:col-span-2 md:w-1/2"} `}>
          <label htmlFor="">Using of contraception</label>
          <div className='flex flex-col gap-2 border border-gray-400 rounded-xl p-2 md:w-3/4 lg:w-1/2 xl:w-2/4 2xl:w-1/4 '>
            <label htmlFor="contraceptionYes" className='flex gap-2 text-sm '>
              <input
                name='using_of_contraception'
                value={"yes"}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio" className='checkedInput' id="contraceptionYes" />
              Yes
            </label>
            <label htmlFor="contraceptionNo" className='flex gap-2 text-sm '>
              <input
                name='using_of_contraception'
                value={"no"}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="radio" className='checkedInput' id="contraceptionNo" />
              No
            </label>
          </div>
          {formik.touched.using_of_contraception && formik.errors.using_of_contraception && <span className='text-red-600 font-medium text-sm'>{formik.errors.using_of_contraception}</span>}
        </div>


        {formik.values.using_of_contraception === "yes" && <div className='flex flex-col  gap-2  '>
          <label htmlFor="">If yes , mention the method</label>
          <div className='flex gap-4 flex-col '>
            <select
              name='contraception_method'
              value={formik.values.contraception_method}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className='outline-none lg:w-1/2  px-2 py-1 rounded-lg select-none  border border-gray-400'>
              <option value={null}  >Choose method</option>
              {["Pills", "IUD", "Injectable", "Other"].map((state, index) => <option key={index} value={state} >{state}</option>)}
            </select>
            {
              formik.values.contraception_method === "Other" &&
              < input
                name='other_contraception_method'
                value={formik.values.other_contraception_method}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                placeholder='Other method' type="tel" className='outline-none lg:w-1/2   px-2 py-1 rounded-lg select-none  border border-gray-400' />
            }

          </div>
          {formik.touched.contraception_method && formik.errors.contraception_method && <span className='text-red-600 font-medium text-sm'>{formik.errors.contraception_method}</span>}
          {formik.touched.other_contraception_method && formik.errors.other_contraception_method && <span className='text-red-600 font-medium text-sm'>{formik.errors.other_contraception_method}</span>}
        </div>}


      </div>

      <button type='submit' className='flex ms-auto me-10  my-5 bg-fuchsia-900 text-white px-12 rounded-xl py-2'>
        {isLoading ? <ImSpinner6 className="animate-spin " size={"1.6rem"} /> : "Save"}
      </button>
    </form>
  )
}

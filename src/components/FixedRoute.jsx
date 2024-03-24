import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from "formik";
import { number, object } from "yup";
import { emptyPatientCode, fixPatientCode, setPatientData } from '../store/slices/patientSlice';
import { useDispatch } from "react-redux";

export default function FixedRoute({ route = "" }) {
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const validationSchema = object({
        search: number("Code must be a number")
            .required("Code  is required")
            .min(1),
    });

    const formik = useFormik({
        initialValues: {
            search: "",
        },
        validationSchema,
        onSubmit: (values) => {
            dispatch(fixPatientCode(values.search))
            navigate(`${values.search}`);
        },
    });

    useEffect(() => {
        dispatch(emptyPatientCode())
        dispatch(setPatientData(null))
    })

    return (
        <section className='grow'>
            <form onSubmit={formik.handleSubmit} className='w-1/2 mx-auto my-10 flex justify-center items-center flex-col' >
                <label htmlFor="search" className='font-semibold self-start '>
                    Search for patient
                </label>
                {formik.errors.search && formik.touched.search && <p className="text-red-600 text-sm self-start -mb-2">{formik.errors.search}</p>}
                <input type="text" onBlur={formik.handleBlur} name="search" value={formik.values.search} onChange={formik.handleChange} className='outline-none border focus:border-2 border-fuchsia-800 w-full px-5 py-2 rounded-lg my-3 ' placeholder='Search by code' />
                <input type="submit" value={"Search by code"} className='bg-fuchsia-800 caret-fuchsia-900 text-white px-5 py-2 rounded-lg outline-none  cursor-pointer' />
            </form>
        </section>
    )

}

import React from 'react'
import { useSelector } from 'react-redux'
import { useAddCervix } from '../../hooks/cervical'
import notify from '../../utilities/alert-toastify'
import * as yup from "yup"
import { useFormik } from 'formik'
import { ImSpinner6 } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

export default function CervicalAdd() {
    const { data: patient } = useSelector(state => state.patient)
    const navigate = useNavigate()
    const onSuccess = (data) => {
        notify(data.data.message, "success")
        navigate(`/patient/cervical/${patient.id}`)

    }
    const onError = () => {
        notify("Something Went Wrong", "error")
    }
    const { mutate, isLoading, isError } = useAddCervix({ onError, onSuccess })

    const validationSchema = yup.object({
        "hpv_vaccine": yup.string().required(),
        "via_test_result": yup.string().required("Result is Required"),
        "via_test_comment": yup.string().required("Comment is Required "),
        "pap_smear_result": yup.string().required("Result is Required"),
        "pap_smear_comment": yup.string().required("Comment is Required "),
        "recommendations": yup.string().required("Recommendations is Required")
    })

    const formik = useFormik({
        initialValues: {
            "patient_id": patient?.id,
            "hpv_vaccine": "",
            "via_test_result": "",
            "via_test_comment": "",
            "pap_smear_result": "",
            "pap_smear_comment": "",
            "recommendations": ""
        },
        validationSchema
        ,
        onSubmit: (values) => {
            values.hpv_vaccine = values.hpv_vaccine === "yes" ? true : false
            mutate(values);
        }
    })
    return (
        <form onSubmit={formik.handleSubmit} onReset={formik.handleReset} className="select-none items-center grid gap-y-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-2 md:px-10 lg:px-16" >
            <div className='lg:col-span-3 md:col-span-2 grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 '>
                <div>
                    <p className='font-medium'>HPV Vaccine</p>
                    <div className='border-2 border-gray-400 flex flex-col gap-3  lg:w-3/4 my-3 xl:w-1/2 rounded-xl p-4'>
                        <label htmlFor="hpv_vaccineYes" className='flex gap-3 font-medium'>
                            <input type="radio" className='checkedInput' onChange={formik.handleChange} onBlur={formik.handleBlur} value={"yes"} name="hpv_vaccine" id="hpv_vaccineYes" />
                            Yes
                        </label>
                        <label htmlFor="hpv_vaccineNo" className='flex gap-3 font-medium'>
                            <input type="radio" className='checkedInput' onChange={formik.handleChange} onBlur={formik.handleBlur} value={"no"} name="hpv_vaccine" id="hpv_vaccineNo" />
                            No
                        </label>
                    </div>
                    {formik.touched.hpv_vaccine && formik.errors.hpv_vaccine && <p className='text-red-600 font-bold'>{formik.errors.hpv_vaccine}</p>}
                </div>
            </div>

            <div className='md:col-span-2 flex flex-col gap-5  capitalize overflow-auto'>
                <table className='border-collapse w-full md:w-3/4  lg:w-5/6  xl:w-3/4 '>
                    <tr>
                        <th></th>
                        <th className='border-2 bg-gray-300 border-blue-600 '>Result</th>
                        <th className='border-2 bg-gray-300 border-blue-600 '>Comments</th>
                    </tr>
                    <tr>
                        <td className='border-2 w-1/4 text-xl font-semibold text-center py-3 bg-gray-300 border-blue-600 ' >VIA Test</td>
                        <td className={` ${(formik.touched.via_test_result && formik.errors.via_test_result) ? "bg-red-400 bg-opacity-30" : "bg-fuchsia-200"} border-2  border-blue-600 `} >
                            <input
                                className={` bg-transparent w-full outline-none  px-5 placeholder:text-red-600 `}
                                type="text"
                                placeholder={(formik.touched.via_test_result && formik.errors.via_test_result) ? formik.errors.via_test_result : ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.via_test_result}
                                name="via_test_result"
                                id="via_test_result" />
                        </td>
                        <td className={` ${(formik.touched.via_test_comment && formik.errors.via_test_comment) ? "bg-red-400 bg-opacity-30" : "bg-fuchsia-200"} border-2  border-blue-600 `} >
                            <input
                                className='bg-transparent w-full outline-none px-5 placeholder:text-red-600'
                                type="text"
                                placeholder={(formik.touched.via_test_comment && formik.errors.via_test_comment) ? formik.errors.via_test_comment : ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.via_test_comment}
                                name="via_test_comment"
                                id="via_test_comment" />
                        </td>
                    </tr>
                </table>

                <table className='border-collapse w-full md:w-3/4 lg:w-5/6 xl:w-3/4 '>
                    <tr>
                        <th></th>
                        <th className='border-2 bg-gray-300 border-blue-600 '>Result</th>
                        <th className='border-2 bg-gray-300 border-blue-600 '>Comments</th>
                    </tr>
                    <tr>
                        <td className='border-2 w-1/4 text-xl font-semibold text-center py-3 bg-gray-300 border-blue-600 ' >Pap smear</td>
                        <td className={` ${(formik.touched.pap_smear_result && formik.errors.pap_smear_result) ? "bg-red-400 bg-opacity-30" : "bg-fuchsia-200"} border-2  border-blue-600 `} >
                            <input
                                className='bg-transparent w-full outline-none px-5 placeholder:text-red-600'
                                type="text"
                                placeholder={(formik.touched.pap_smear_result && formik.errors.pap_smear_result) ? formik.errors.pap_smear_result : ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.pap_smear_result}
                                name="pap_smear_result"
                                id="pap_smear_result" /></td>
                        <td className={` ${(formik.touched.pap_smear_comment && formik.errors.pap_smear_comment) ? "bg-red-400 bg-opacity-30" : "bg-fuchsia-200"} border-2  border-blue-600 `} >
                            <input
                                className='bg-transparent w-full outline-none px-5 placeholder:text-red-600'
                                type="text"
                                placeholder={(formik.touched.pap_smear_comment && formik.errors.pap_smear_comment) ? formik.errors.pap_smear_comment : ""}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.pap_smear_comment}
                                name="pap_smear_comment"
                                id="pap_smear_comment" />
                        </td>
                    </tr>
                </table>
            </div>

            <textarea
                name="recommendations"
                className={`w-full border-2 col-span-1 ${(formik.touched.recommendations && formik.errors.recommendations) ? "border-red-600 placeholder:text-red-600" : "border-gray-300"}   resize-none p-5 outline-none rounded-xl`}
                placeholder={`${(formik.touched.recommendations && formik.errors.recommendations) ? formik.errors.recommendations : "Write your recommendations"}`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                rows={8}
                value={formik.values.recommendations}
                id="recommendations" />


            <div className="flex print:hidden col-span-1  md:col-span-3  gap-x-8 gap-y-4 justify-end md:flex-row flex-col my-10  items-end md:items-center me-16">
                <button
                    type="submit"
                    className="rounded-lg text-white bg-fuchsia-900 flex text-base md:text-xl font-medium gap-4 px-20 py-2"
                >
                    {isLoading ? (
                        <ImSpinner6 className="animate-spin " size={"1.6rem"} />
                    ) : (
                        "Save"
                    )}
                </button>
            </div>


        </form>
    )
}

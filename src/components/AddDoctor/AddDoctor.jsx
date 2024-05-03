import { Link, useParams } from "react-router-dom";
import leftArrow from "../../assets/images/left-arrow.svg";
import sample from "../../assets/businessman-character-avatar-isolated_24877-60111.jpg";
import InputElement from "./InputElement";
import { useDispatch, useSelector } from "react-redux";
import {
    addDoctor,
    getDoctor,
    resetDoctor,
    updateDoctor,
} from "../../store/slices/doctorSlice";
import { useFormik } from "formik";
import { object, ref, string } from "yup";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { inputTextArr, toastAddDoctor } from "./definations";
export default function AddDoctor() {
    const initialValues = inputTextArr.reduce((acc, e) => {
        acc[e.id] = "";
        return acc;
    }, {});
    const { user } = useSelector((state) => state.auth);
    const { id } = useParams();
    const { getDoctorState, updateDoctorState, newDoctorState } = useSelector(
        (e) => e.doctor
    );

    const validationSchema = object().shape({
        name: string().required("Name is required"),
        password: string()
            .required("Password is required")
            .matches(
                /(?:[a-zA-Z0-9] ?){7}[a-zA-Z0-9]$/,
                "Password must be 8 or more characters"
            ),
        password_confirmation: string()
            .required("Password confirmation is required")
            .oneOf([ref("password")], "Passwords must match"),
        email: string().email("Invalid email").required("Email is required"),
        phone_number: string()
            .required("Phone is required")
            .matches(/(?:[0-9] ?){10}[0-9]$/, "Invalid phone number"),
    });
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,
        onSubmit: (values) => {
            id
                ? dispatch(updateDoctor({ id, values }))
                : dispatch(addDoctor(values));
        },
    });
    useEffect(() => {
        const newInitialValues = inputTextArr.reduce((acc, e) => {
            acc[e.id] = getDoctorState.data ? getDoctorState.data[e.id] : "";
            return acc;
        }, {});
        formik.setValues(newInitialValues);
    }, [getDoctorState]);
    useEffect(() => {
        toastAddDoctor(
            newDoctorState,
            "doctor has been saved successfully",
            "the email has already been taken."
        );
    }, [newDoctorState]);
    useEffect(() => {
        toastAddDoctor(
            updateDoctorState,
            "doctor has been updated successfully",
            "the email has already been taken."
        );
    }, [updateDoctorState]);
    useEffect(() => {
        if (id) {
            dispatch(getDoctor(id));
        }
    }, []);
    return (
        <div id="add_doctor_cont">
            <header className="bg-fuchsia-900 h-20 flex justify-between">
                <div
                    id="left-part"
                    className="
                    flex
                    items-center
                    w-1/3
                    justify-around
                    "
                >
                    <Link
                        onClick={() => {
                            formik.setValues(initialValues);
                            dispatch(resetDoctor());
                        }}
                        to={`/dashboard/${user.id}`}
                    >
                        <img
                            src={leftArrow}
                            alt=""
                            className="
                            w-6
                            sm:w-6
                            md:w-10
                            transition-all
                            hover:opacity-70
                            "
                        />
                    </Link>
                    <h1
                        className="
                    text-white 
                    font-bold 
                    text-sm
                    sm:text-2xl 
                    md:text-4xl"
                    >
                        {id ? 'Edit' : 'Add'} Doctor
                    </h1>
                </div>
                <div
                    id="right-part"
                    className="
                        flex
                        items-center
                        mr-10
                        justify-end
                        w-1/3
                    "
                >
                    <p className="align-middle text-white text-md font-bold justify-center">
                        {user.name}
                    </p>
                    {/* <img
                        src={sample}
                        className="w-10 ml-5 rounded-full border-2"
                        alt=""
                    /> */}
                </div>
            </header>
            <div className="flex flex-wrap flex-col lg:m-20">
                <div
                    id="form-cont"
                    className={`m-5 ${
                        id ? !getDoctorState.data && "filter blur-sm" : ""
                    }`}
                >
                    <div id="input-cont" className="flex flex-wrap">
                        {inputTextArr.map((e, i) => (
                            <InputElement
                                key={i}
                                id={e.id}
                                name={e.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                labelText={e.labelText}
                                placeholder={e.placeholder}
                                type={e.type}
                                value={formik.values[e.id]}
                                error={formik.errors[e.id]}
                                touched={formik.touched[e.id]}
                            />
                        ))}
                    </div>
                    <div
                        id="btn-cont"
                        className="flex align-middle justify-center mt-36 "
                    >
                        <button
                            type="submit"
                            onClick={formik.handleSubmit}
                            className={`
                                        bg-fuchsia-800
                                        lg:hover:bg-fuchsia-600
                                        lg:active:bg-fuchsia-800
                                        md:active:scale-95
                                        md:active:shadow-none
                                        px-14
                                        py-2
                                        rounded-lg
                                        text-white
                                        text-sm
                                        md:text-md
                                        lg:text-xl
                                        font-medium
                                        lg:px-20
                                        lg:py-4
                                        shadow-2xl
                                        transition-all
                                    `}
                        >
                            {id ? "Update" : "Add"}
                        </button>
                    </div>
                    {inputTextArr.map((e, i) =>
                        formik.errors[e.id] && formik.touched[e.id] ? (
                            <p
                                key={i}
                                className="text-center text-red-600 text-sm mt-3"
                            >
                                {formik.errors[e.id]}
                            </p>
                        ) : null
                    )}
                </div>
            </div>
        </div>
    );
}

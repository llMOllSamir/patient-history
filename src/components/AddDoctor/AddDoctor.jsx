import { Link } from "react-router-dom";
import leftArrow from "../../assets/images/left-arrow.svg";
import sample from "../../assets/businessman-character-avatar-isolated_24877-60111.jpg";
import InputElement from "./InputElement";
import { useDispatch } from "react-redux";
import { addDoctor } from "../../store/slices/doctorSlice";
import { Formik, useFormik } from "formik";
import { object, ref, string } from "yup";
export default function AddDoctor() {
    const inputTextArr = [
        {
            id: "name",
            name: "name",
            labelText: "Name",
            placeholder: "Enter your Name",
            type: "text",
        },
        {
            id: "password",
            name: "password",
            labelText: "Password",
            placeholder: "Enter your password",
            type: "password",
        },
        {
            id: "email",
            name: "email",
            labelText: "E-mail",
            placeholder: "Enter your email",
            type: "email",
        },
        {
            id: "confirm-password",
            name: "confirm-password",
            labelText: "Confirm password",
            placeholder: "Confirm your password",
            type: "password",
        },
        {
            id: "phone",
            name: "phone",
            labelText: "Phone number",
            placeholder: "Enter your Phone number",
            type: "tel",
        },
    ];

    const validationSchema = object({
        name: string().required("Name is required"),
        password: string().required("Password is required").matches(/(?:[a-zA-Z0-9] ?){7}[a-zA-Z0-9]$/,"Password must be 8 or more character"),
        'confirm-password': string().required("Password confirmation is required")
            .oneOf([ref("password")], "Passwords must match")
            ,
        email: string().email("Invalid email").required("Email is required"),
        phone: string().required("Phone is required").matches(
            /(?:[0-9] ?){10}[0-9]$/,
            "Invalid phone number"
        ),
    });
    const formik = useFormik({
        initialValues: inputTextArr.reduce((acc, e) => {
            acc[e.id] = "";
            return acc;
        }, {}),
        validationSchema,
        onSubmit: (values) => {
            dispatch(addDoctor(values));
        },
    });
    const dispatch = useDispatch();

    return (
        <div id="add_doctor_cont">
            <header className="bg-fuchsia-800 h-16 flex justify-between">
                <div
                    id="left-part"
                    className="
                    flex
                    items-center
                    w-1/3
                    justify-around
                    "
                >
                    <Link to="/dashboard">
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
                        Add Doctor
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
                    <p className="align-middle text-white text-xs font-normal justify-center">
                        Doctor's Name
                    </p>
                    <img
                        src={sample}
                        className="w-10 ml-5 rounded-full border-2"
                        alt=""
                    />
                </div>
            </header>
            <div className="flex flex-wrap flex-col lg:m-20">
                <div id="form-cont" className="m-5">
                    <Formik
                        initialValues={formik.initialValues}
                        validationSchema={formik.validationSchema}
                        onSubmit={formik.onSubmit}
                    >
                        <>
                            <div id="input-cont" className="flex flex-wrap">
                                {inputTextArr.map((e) => (
                                    <div
                                    id="input-cont"
                                    className="flex items-center w-1/2 my-8 text-sm lg:text-lg">
                                        <InputElement
                                        key={e.id}
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
                                    </div>
                                ))}
                            </div>
                            <div
                                id="btn-cont"
                                className="flex align-middle justify-center mt-36 "
                            >
                                <button
                                    type="submit"
                                    onClick={formik.handleSubmit}
                                    className="
                                        bg-fuchsia-800
                                        lg:hover:bg-fuchsia-600
                                        lg:active:bg-fuchsia-800
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
                                        md:active:scale-95
                                        md:active:shadow-none
                                        transition-all
                                    "
                                >
                                    Add
                                </button>
                            </div>
                        </>
                    </Formik>
                </div>
            </div>
        </div>
    );
}

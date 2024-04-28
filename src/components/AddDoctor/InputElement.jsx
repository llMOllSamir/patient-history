import { useField } from "formik";

export default function InputElement({ labelText, error, touched, ...props }) {
    console.log(props.id)
    return (
        <div
        id="input-cont"
        className="flex items-center w-1/2 my-8 text-sm lg:text-lg">
            <label
                className={`align-middle mr-10 text-end w-48 ${error && touched ? 'text-red-500' : 'text-black'} `}
                htmlFor={props.id}
            >
                {labelText}
            </label>
            <div className="flex flex-col">
            <input
                {...props}
                className={`border focus:outline-none ${error && touched ? 'border-red-500' : 'border-gray-300'} rounded-md p-1 focus:shadow-lg transition-shadow`}
            />
            {/* {
                error && touched ? <p className="text-red-600 text-sm mt-3">{error}</p> : null
            } */}
            </div>
        </div>
    );
}

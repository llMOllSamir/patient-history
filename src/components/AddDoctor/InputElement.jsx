import { useField } from "formik";

export default function InputElement({ labelText, error, touched, ...props }) {
    return (
        <>
            <label
                className={"align-middle mr-10 text-end w-48 text-black"}
                htmlFor={props.id}
            >
                {labelText}
            </label>
            <div className="flex flex-col">
            <input
                {...props}
                className={"border focus:outline-none border-gray-300 rounded-md p-1 focus:shadow-lg transition-shadow"}
            />
            {
                error && touched ? <p key={props.key} className="text-red-600 text-sm">{error}</p> : null
            }
            </div>
        </>
    );
}

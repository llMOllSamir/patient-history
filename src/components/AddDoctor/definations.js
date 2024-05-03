import { toast } from "react-toastify";
export const inputTextArr = [
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
        id: "password_confirmation",
        name: "password_confirmation",
        labelText: "Confirm password",
        placeholder: "Confirm your password",
        type: "password",
    },
    {
        id: "phone_number",
        name: "phone_number",
        labelText: "Phone number",
        placeholder: "Enter your Phone number",
        type: "tel",
    },
];

export function toastAddDoctor(state, case1, case2){
    switch (
        state?.response?.data?.message?.toLowerCase() ||
        state?.data?.message?.toLowerCase() ||
        state?.message?.toLowerCase()
    ) {
        case case1:
            toast.success(state?.data?.message);
            break;
        case case2:
            toast.error(state?.response?.data?.message);
            break;
        case "network error":
            toast.error("Connection Error");
            break;
        default:
    }
}
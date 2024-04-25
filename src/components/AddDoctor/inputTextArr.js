import { type } from "@testing-library/user-event/dist/type";

const inputTextArr = [
    {
        id: "name",
        labelText: "Name",
        placeholder: "Enter your Name",
        type: "text",
    },
    {
        id: "password",
        labelText: "Password",
        placeholder: "Enter your password",
        type: "password",
    },
    {
        id: "email",
        labelText: "E-mail",
        placeholder: "Enter your email",
        type: "email",
    },
    {
        id: "confirm-password",
        labelText: "Confirm password",
        placeholder: "Confirm your password",
        type: "password",
    },
    {
        id: "phone",
        labelText: "Phone number",
        placeholder: "Enter your Phone number",
        type: "tel",
    },
];

export default inputTextArr;

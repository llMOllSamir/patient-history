export default function InputElement({ labelText, id, placeholder, type }) {
    return (
        <div
            id="input-cont"
            class="flex items-center w-1/2 my-8 text-sm lg:text-lg"
        >
            <label class="align-middle mr-10 text-end w-48" for={id}>
                {labelText}
            </label>
            <input
                type={type}
                class="border focus:outline-none border-gray-300 rounded-md p-1 lg:w-64"
                name="input1"
                placeholder={placeholder}
                id={id}
            />
        </div>
    );
}

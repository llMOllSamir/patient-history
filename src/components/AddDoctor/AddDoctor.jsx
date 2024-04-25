import { Link } from "react-router-dom";
import leftArrow from "../../assets/images/left-arrow.svg";
import sample from "../../assets/businessman-character-avatar-isolated_24877-60111.jpg";
import InputElement from "./InputElement";
import inputTextArr from "./inputTextArr";
export default function AddDoctor() {
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
                <div id="form-cont" className="flex flex-wrap">
                    {inputTextArr.map((e) => (
                        <InputElement
                            id={e.id}
                            labelText={e.labelText}
                            placeholder={e.placeholder}
                            type={e.type}
                        />
                    ))}
                </div>
                <div
                    id="btn-cont"
                    className="flex align-middle justify-center mt-36"
                >
                    <button
                        className="
                    bg-fuchsia-800
                    px-14
                    py-2
                    rounded-lg
                    text-white
                    text-sm
                    font-medium
                    lg:px-20
                    lg:py-4
                    "
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

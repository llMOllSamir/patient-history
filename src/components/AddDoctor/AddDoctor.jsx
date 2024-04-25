import { Link } from "react-router-dom";
import leftArrow from "../../assets/images/left-arrow.svg";
import sample from "../../assets/businessman-character-avatar-isolated_24877-60111.jpg";
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
                            hover:animate-pulse
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
            <main>
                
            </main>
        </div>
    );
}

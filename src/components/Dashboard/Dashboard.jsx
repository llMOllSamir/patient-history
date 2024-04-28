import { useState } from "react";
import { MdAdd, MdDelete, MdEdit, MdHistory } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import DashboredHeader from "../DashboredHeader/DashboredHeader";
import { IoHomeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
    addAdminActivity,
    deleteDoctor,
    setDoctorsData,
    setHistory,
} from "../../store/slices/doctorSlice";
import LoadingPatient from "../../LoadingPatient";
import {
    useDeleteDoctor,
    useGetAdminActivities,
    useGetDoctors,
} from "../../hooks/doctor";
import notify from "../../utilities/alert-toastify";

function Dashboard() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { data, history } = useSelector((state) => state.doctor);
    const { user } = useSelector((state) => state.auth);

    const doctorsOnSuccess = (data) => {
        dispatch(setDoctorsData(data.data));
    };

    const doctorsOnError = (error) => {
        notify(error.message, "error");
    };

    const adminActivitiesOnSuccess = (data) => {
        dispatch(setHistory(data.data));
    };

    const adminActivitiesOnError = (error) => {
        notify(error.message, "error");
    };

    const adminResult = useGetAdminActivities({
        id,
        adminActivitiesOnError,
        adminActivitiesOnSuccess,
    });
    const docResult = useGetDoctors({
        doctorsOnError,
        doctorsOnSuccess,
    });

    // Handle loading, error, and data for both queries
    if (docResult.isLoading || adminResult.isLoading) {
        return <LoadingPatient />;
    }

    if (docResult.isError || adminResult.isError) {
        return (
            <div className="mx-4  text-center h-1/2 items-center justify-center   flex flex-col gap-5  ">
                <h2 className="font-bold text-red-500 text-3xl">
                    Error: Something Wrong Happened
                </h2>
            </div>
        );
    }

    if (user.role === "admin" && data && data.length) {
        return (
            <>
                <DashboredHeader />

                <div className="flex justify-end text-white pr-20">
                    <Link
                        to="/"
                        className="mr-2 flex items-center gap-2 bg-fuchsia-700 px-5 py-2 text-lg font-semibold rounded-lg hover:bg-fuchsia-800"
                    >
                        <IoHomeOutline />
                        Home
                    </Link>
                </div>

                <div className="flex flex-row max-lg:flex-col-reverse gap-3 max-lg:items-center justify-center py-5">
                    <div className="flex flex-col gap-3">
                        <span className="text-xl font-semibold text-blue-600 py-1">
                            Activity history
                        </span>

                        <div className="flex overflow-x-auto flex-col text-xl rounded font-medium  text-zinc-500 max-h-[500px]">
                            {history.map((activity, index) => (
                                <ActivityItem key={index} {...activity} />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center px-3">
                            <span className="text-xl font-semibold text-blue-600">
                                Doctors List
                            </span>
                            <Link to='/add' className="flex gap-2 items-center justify-center self-end px-3 py-1 text-xl font-medium text-center bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800 text-white">
                                <MdAdd size={"1.5rem"} />
                                Add Doctor
                            </Link>
                        </div>
                        <div className="flex flex-col max-w-2xl text-base rounded leading-5 text-white overflow-x-auto max-h-[500px]">
                            {data.map((doctor, index) => (
                                <DoctorItem key={doctor.id} doctor={doctor} />
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Dashboard;

function DoctorItem({ doctor }) {
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
    };
    return (
        <div className="flex flex-col justify-center px-5 py-3.5 w-full border-r border-b border-l border-solid bg-neutral-200 border-stone-300 max-md:max-w-full">
            <div className="flex gap-5 justify-between w-full max-md:flex-wrap max-md:max-w-full">
                <h2 className="text-xl font-semibold text-blue-600">
                    {doctor.name}
                </h2>
                <Link
                    to={`/doctor/history/${doctor.id}`}
                    className="flex gap-1 px-2.5 py-0.5 text-center bg-blue-900 rounded-lg hover:bg-blue-950"
                >
                    <MdHistory size={"1.5rem"} /> View history
                </Link>
                <Link className="flex gap-1 self-start px-2.5 py-1 text-center text-gray-200 whitespace-nowrap bg-blue-900 rounded-lg hover:bg-blue-950">
                    <MdEdit size={"1.2rem"} />
                    Edit
                </Link>
                <button
                    className="flex gap-1 px-2.5 py-0.5 text-center whitespace-nowrap bg-rose-500 rounded-lg hover:bg-rose-600"
                    onClick={toggleModal}
                >
                    <MdDelete size={"1.5rem"} />
                    Delete
                </button>
            </div>
            {/* {showModal && (
                <DeleteConfirmModal doctor={doctor} toggleModal={toggleModal} />
            )} */}
        </div>
    );
}

const ActivityItem = ({ action, doctor_name, date, time }) => (
    <div className="flex gap-3.5 px-7 py-3.5 border-r border-b border-l border-solid bg-neutral-200 border-stone-300 max-md:flex-wrap max-md:px-5">
        <div className="text-blue-600 capitalize">
            {action} {doctor_name}
        </div>{" "}
        <div>|</div>
        <div className="text-lg text-neutral-500">{date}</div> <div>|</div>
        <div className="text-lg text-neutral-500">{time}</div>
    </div>
);

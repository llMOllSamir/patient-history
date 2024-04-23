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
              <Link className="flex gap-2 items-center justify-center self-end px-3 py-1 text-xl font-medium text-center bg-fuchsia-700 rounded-lg hover:bg-fuchsia-800 text-white">
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
        <h2 className="text-xl font-semibold text-blue-600">{doctor.name}</h2>
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
      {showModal && (
        <DeleteConfirmModal doctor={doctor} toggleModal={toggleModal} />
      )}
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

function LoadingSpinner() {
  return (
    <div role="status" className="text-white">
      <svg
        aria-hidden="true"
        className="inline w-4 h-4 me-3 text-white animate-spin"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  );
}

function formatDate(currentDate) {
  const day = String(currentDate.getDate()).padStart(2, "0");
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // January is 0!
  const year = currentDate.getFullYear();

  return `${day}-${month}-${year}`;
}

function formatTime(currentDate) {
  let hours = currentDate.getHours();
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const meridiem = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${meridiem}`;
}

function DeleteConfirmModal({ doctor, toggleModal }) {
  const dispatch = useDispatch();
  const onSuccess = () => {
    const event = {
      action: "deleted",
      doctor_id: doctor.id,
      doctor_name: `Dr. ${doctor.name}`,
      date: formatDate(new Date()),
      time: formatTime(new Date()),
    };
    dispatch(deleteDoctor(doctor.id));
    dispatch(addAdminActivity(event));
    notify("Doctor deleted successfully", "success");
  };
  const onError = () => {
    notify("Error deleting data", "error");
  };

  const { isLoading, mutate } = useDeleteDoctor({ onSuccess, onError });

  const handleDeleteDoctor = (id) => {
    mutate(id);
  };
  return (
    <div
      id="deleteModal"
      tabIndex="-1"
      aria-hidden="true"
      className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-modal md:h-full bg-black bg-opacity-70"
    >
      <div className="relative p-4 w-full max-w-md h-full md:h-auto">
        <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5">
          <button
            type="button"
            className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-cente"
            data-modal-toggle="deleteModal"
            onClick={toggleModal}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <svg
            className="text-gray-400 w-11 h-11 mb-3.5 mx-auto"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <p className="mb-4 text-gray-500">
            Are you sure you want to delete this doctor?
          </p>
          <div className="flex justify-center items-center space-x-4">
            <button
              data-modal-toggle="deleteModal"
              type="button"
              className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 "
              onClick={toggleModal}
            >
              No, cancel
            </button>
            <button
              type="submit"
              className="py-2 px-3 flex gap-1 items-center text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300"
              onClick={() => handleDeleteDoctor(doctor.id)}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner /> Loading...
                </>
              ) : (
                "Yes, I'm sure"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

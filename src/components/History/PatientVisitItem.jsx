import React from "react";

export function PatientVisit({
  date,
  doctor_name,
  patient_name,
  index,
  setIndex,
  type,
}) {
  return (
    <div className="flex gap-5 mt-5 w-full max-w-[1147px] max-md:flex-wrap max-md:max-w-full ">
      <div className="flex flex-auto gap-5 px-3 py-5 justify-between items-center bg-white shadow-sm max-md:flex-wrap max-md:px-5 max-md:max-w-full rounded">
        <div className="text-xl">{date}</div>
        <div className="my-auto text-xl capitalize">
          {type === "doctor" ? `DR.${doctor_name}` : `${patient_name}`}
        </div>
        <button
          className="justify-center self-start px-5 py-1.5 text-base font-medium leading-5 text-center text-white bg-blue-600 rounded-md border-2 border-blue-600 border-solid max-md:px-5"
          onClick={() => setIndex(index)}
        >
          View Data
        </button>
      </div>
    </div>
  );
}

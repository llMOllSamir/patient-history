import { useState } from "react";
import {
  Breast,
  Cervix,
  GeneralExamination,
  Gynecological,
  Obstetrics,
  Osteoporosis,
  Ovarian,
  PersonalInformation,
  PreEclampsia,
  Uterine,
} from "./ExaminationsComponents";

export default function Visit({ data, setIndex }) {
  const examinations = [
    {
      title: "Personal Information",
      value: "personal_information",
      element: <PersonalInformation data={data.personal_information} />,
    },
    {
      title: "General Examination",
      value: "general_examination",
      element: (
        <GeneralExamination generalExamination={data.general_examination} />
      ),
    },
    {
      title: "Gynecological",
      value: "gynaecological",
      element: <Gynecological gynecological={data.gynaecological} />,
    },
    {
      title: "Obstetrics",
      value: "obstetric",
      element: <Obstetrics obstetrics={data.obstetric} />,
    },
    {
      title: "Cervical Cancer",
      value: "cervix",
      element: <Cervix cervix={data.cervix} />,
    },
    {
      title: "Breast Cancer",
      value: "breast",
      element: <Breast breast={data.breast} />,
    },
    {
      title: "Ovarian Cancer",
      value: "ovarian",
      element: <Ovarian ovarian={data.ovarian} />,
    },
    {
      title: "Uterine Cancer",
      value: "uterine",
      element: <Uterine uterine={data.uterine} />,
    },
    {
      title: "Osteoporosis",
      value: "osteoporosis",
      element: <Osteoporosis osteoporosis={data.osteoporosis} />,
    },
    {
      title: "Pre-eclampsia",
      value: "preEclampsia",
      element: <PreEclampsia preEclampsia={data.preEclampsia} />,
    },
  ];
  const [examination, setExamination] = useState(examinations[0].value);
  const handleChange = (e) => {
    setExamination(e.target.value);
  };
  return (
    <>
      <div className="mx-4 lg:mx-16 grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
        <div className={`flex flex-col font-medium gap-1 capitalize`}>
          <label htmlFor={"display"} className="text-base">
            Data To Display
          </label>
          <select
            value={examination}
            name="display"
            id="display"
            onChange={handleChange}
            className={`cursor-pointer border outline-none px-2 py-1 border-gray-500 placeholder:text-gray-500 rounded-lg  w-full`}
          >
            {examinations.map((state, index) => (
              <option
                key={index}
                className="capitalize cursor-pointer"
                value={state.value}
              >
                {state.title}
              </option>
            ))}
          </select>
        </div>
        <div className="self-end text-xl text-center">{data.date}</div>
        <div className="self-end text-xl capitalize text-center">
          DR.{data.doctor_name}
        </div>
        <div className="self-end flex justify-center md:self-end">
          <button
            className="px-5 py-1 text-base font-medium text-center text-white bg-blue-600 rounded-md border-2 border-blue-600 border-solid max-md:px-5"
            onClick={() => setIndex(0)}
          >
            Back
          </button>
        </div>
      </div>

      {examinations.find((x) => x.value === examination).element}
    </>
  );
}

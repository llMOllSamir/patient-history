import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo-transparent.svg";
import * as svgs from "../SVG/svgTags";
import { useSelector } from "react-redux";
import { MdHistory } from "react-icons/md";
import { QRCodeCanvas } from "qrcode.react";
import { CiSearch } from "react-icons/ci";

export default function SlideNav() {
  const { patientCode, data } = useSelector((state) => state.patient);
  const { pathname } = useLocation();

  const links = [{
    title: "Search",
    ref: `search`,
    logo: CiSearch,
  },
  {
    title: "Personal Information",
    ref: `personal-information/${data?.patient_code || ""}`,
    logo: svgs.Information,
  },
  {
    title: "General Examination",
    ref: `General-examination/${data?.id || ""}`,
    logo: svgs.Examination,
  },
  {
    title: "Gynecological history",
    ref: `gynecological-history/${data?.id || ""}`,
    logo: svgs.Gynecological,
  },
  {
    title: "Obstetrics history",
    ref: `obstetrics-history/${data?.id || ""}`,
    logo: svgs.Obstetrics,
  },
  ];

  const oncology = [
    {
      title: "Cervical Cancer",
      ref: `cervical/${data?.id || ""}`,
      logo: svgs.Cervical,
    },
    { title: "Breast Cancer", ref: `breast/${data?.id || ""}`, logo: svgs.Breast },
    {
      title: "Ovarian Cancer",
      ref: `ovarian/${data?.id || ""}`,
      logo: svgs.Ovarian,
    },
    {
      title: "Uterine Cancer",
      ref: `uterine/${data?.id || ""}`,
      logo: svgs.Uterine,
    },
  ];

  return (
    <aside className=" select-none    print:hidden md:w-2/6 xl:w-3/12 2xl:w-1/6 lg:w-3/12 w-2/5 bg-fuchsia-900  text-white">
      {data && !pathname.endsWith("add") ? (
        <div className="flex justify-center w-full md:3/4 xl:w-5/6 mx-auto flex-col gap-1 items-center my-12">
          <svgs.Profile />
          <h2 className="text-2xl font-semibold mt-4">
            {data.name.split(" ").slice(0, 2).join(" ")}
          </h2>
          <p className="text-sm font-normal text-orange-300">{patientCode}</p>
          <button
            onClick={printQRCode}
            type="button"
            className="text-xs font-medium bg-fuchsia-950 px-5 py-1 rounded-xl text-gray-400"
          >
            Print ID card
          </button>

          {patientCode && (
            <>
              <QRCodeCanvas
                id="qr-code"
                value={encodeURI(
                  `${window.location.origin}/patient/personal-information/${patientCode}`
                )}
                size={100}
                level={"Q"}
                className=" hidden"
              />
              <PatientCard
                name={data.name}
                code={patientCode}
                age={data.age}
                phone={data.phone_number}
                address={data.address}
              />
            </>
          )}
        </div>
      ) : (
        <Link to={"/"}>
          <img
            className="w-full sm:w-2/4 md:w-2/4 lg:w-3/4 xl:w-3/6 mb-12 mx-auto mt-10"
            src={logo}
            alt="logo"
          />
        </Link>
      )}

      <nav className="w-full">
        <ul className="flex flex-col gap-y-2 items-center justify-start">
          {links.map((link, index) => (
            <li
              className={`py-2 w-full has-[.active]:bg-white font-medium has-[.active]:text-fuchsia-900 sm:px-10`}
              key={index}
            >
              <NavLink
                className={`flex justify-start items-center gap-2  ${pathname.split("/").includes(link.ref.split("/")[0]) &&
                  "active"
                  } `}
                to={link.ref}
              >
                <link.logo
                  size={"1.5rem"}
                  fill={
                    pathname.split("/").includes(link.ref.split("/")[0])
                      ? "#773479"
                      : "white"
                  }
                />
                {link.title}
              </NavLink>
            </li>
          ))}

          <li className=" flex justify-start  w-full">
            <ul className="w-full">
              <p className="block sm:px-10 text-start w-full my-2 font-bold text-xl">
                Oncology
              </p>
              {oncology.map((link, index) => (
                <li
                  className="md:px-8 lg:px-10 py-2 w-full has-[.active]:bg-white font-medium has-[.active]:text-fuchsia-900 "
                  key={index}
                >
                  <NavLink
                    className={`flex justify-center items-center gap-2`}
                    to={link.ref}
                  >
                    <link.logo
                      fill={pathname.includes(link.ref) ? "#773479" : "white"}
                    />
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>

          <li className="sm:px-10  py-2 w-full has-[.active]:bg-white font-medium has-[.active]:text-fuchsia-900 ">
            <NavLink
              className={`flex justify-start items-center gap-2`}
              to={`Osteoporosis/${data?.id || ""}`}
            >
              <svgs.Osteoporosis
                fill={pathname.includes("Osteoporosis") ? "#773479" : "white"}
              />
              Osteoporosis
            </NavLink>
          </li>

          <li className="sm:px-10 py-2 w-full has-[.active]:bg-white font-medium has-[.active]:text-fuchsia-900 ">
            <NavLink
              className={`flex justify-start items-center gap-2`}
              to={`Pre-eclampsia/${data?.id || ""}`}
            >
              <svgs.Eclampsia
                fill={pathname.includes("Pre-eclampsia") ? "#773479" : "white"}
              />
              Pre-eclampsia
            </NavLink>
          </li>

          <li className="sm:px-10 py-2 w-full has-[.active]:bg-white font-medium has-[.active]:text-red-900 ">
            <NavLink
              className={`flex justify-start items-center gap-2`}
              to={`patient-history/${data?.id || ""}`}
            >
              <MdHistory
                color={
                  pathname.includes("patient-history") ? "#773479" : "white"
                }
                size={"1.5rem"}
              />
              patient history
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function PatientCard({ name, code, phone, age, address }) {
  const [qrCodeDataUrl, setQRCodeDataUrl] = useState("");

  useEffect(() => {
    // Function to generate QR code data URL
    const generateQRCodeDataUrl = () => {
      const canvas = document.getElementById("qr-code");
      const dataUrl = canvas.toDataURL(); // Get data URL of the canvas
      setQRCodeDataUrl(dataUrl);
    };

    // Generate QR code data URL when component mounts
    generateQRCodeDataUrl();
  }, [code]); // Re-run effect when the 'code' prop changes

  return (
    <section
      className="px-4 py-4 bg-white max-md:px-5 hidden"
      id="patient-card"
    >
      <div
        className="px-4 py-4 flex gap-5  max-md:gap-0 bg-white border-2 border-solid border-black rounded"
        style={{ width: "450px" }}
      >
        <div className="flex w-6/12 flex-col text-black mt-2">
          <h1 className="text-xl font-bold text-blue-700 max-md:text-4xl capitalize">
            {name}
          </h1>
          <p className="mt-3">
            <span className="font-bold">Age:</span> {age} Years
          </p>
          <p>
            <span className="font-bold">Code:</span> {code}
          </p>
          <p>
            <span className="font-bold">Phone:</span> {phone}
          </p>
          <p>
            <span className="font-bold">Address:</span> {address}
          </p>
        </div>

        {qrCodeDataUrl && (
          <img
            src={qrCodeDataUrl}
            alt="QR Code"
            className="w-5/12 mx-auto my-auto"
          />
        )}
      </div>
    </section>
  );
}

const printQRCode = () => {
  const node = document.getElementById("patient-card");

  const windowContent = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" />
      <title>Print</title>
    </head>
    <body>
      ${node.innerHTML}
    </body>
    </html>`;
  const printWindow = window.open("", "", "width=450,height=500");

  printWindow.document.open();
  printWindow.document.write(windowContent);
  printWindow.document.close();

  printWindow.print();
};

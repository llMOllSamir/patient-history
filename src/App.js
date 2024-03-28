import React from "react";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import NotFound from "./components/NotFound/NotFound";
import Login from "./components/Login/Login";
import PatientLayout from "./components/PatientLayout/PatientLayout";
import PersonalInformation from "./components/PersonalInformation/PersonalInformation";
import RouteOutlet from "./components/RouteOutlet/RouteOutlet";
import AddPatient from "./components/AddPatient/AddPatient";
import UpdatePatient from "./components/UpdatePatient/UpdatePatient";
import GeneralExamination from "./components/GeneralExamination/GeneralExamination";
import AddUpdateGeneralExamination from "./components/GeneralExamination/AddUpdateGeneralExamination";
import { ToastContainer } from "react-toastify";
import PatientObstetricsHistory from "./components/PatientObstetricsHistory/PatientObstetricsHistory";
import AddUpdateObstetricsHistory from "./components/PatientObstetricsHistory/AddUpdateObstetricsHistory";
import PatientOsteoporosisHistory from "./components/PatientOsteoporosis/PatientOsteoporosis";
import AddUpdateOsteoporosisHistory from "./components/PatientOsteoporosis/AddUpdateOsteoporosis";
import PatientPreEclampsia from "./components/PatientPreEclampsia/PatientPreEclampsia";
import AddUpdatePreEclampsiaHistory from "./components/PatientPreEclampsia/AddUpdatePreEclampsia";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        {
          path: "/patient",
          element: <PatientLayout />,
          children: [
            {
              path: "personal-information",
              element: (
                <RouteOutlet
                  title="Personal Information"
                  route="personal-information"
                />
              ),
              children: [
                { path: "new-patient", element: <AddPatient /> },
                { path: "update-patient/:id", element: <UpdatePatient /> },
                { path: ":id", element: <PersonalInformation /> },
              ],
            },
            {
              path: "General-examination",
              element: (
                <RouteOutlet
                  title="General examination"
                  route="General-examination"
                />
              ),
              children: [
                {
                  path: "add",
                  element: <AddUpdateGeneralExamination state="add" />,
                },
                {
                  path: "update/:id",
                  element: <AddUpdateGeneralExamination />,
                },
                { path: ":id", element: <GeneralExamination /> },
              ],
            },
            {
              path: "gynecological-history",
              element: (
                <RouteOutlet
                  title="Gynecological history"
                  route="gynecological-history"
                />
              ),
              children: [
                { path: "add" },
                { path: "update/:id" },
                { path: ":id" },
              ],
            },
            {
              path: "obstetrics-history",
              element: (
                <RouteOutlet
                  title="Obstetrics history"
                  route="obstetrics-history"
                />
              ),
              children: [
                {
                  path: "add",
                  element: <AddUpdateObstetricsHistory state="add" />,
                },
                { path: "update/:id", element: <AddUpdateObstetricsHistory /> },
                { path: ":id", element: <PatientObstetricsHistory /> },
              ],
            },
            {
              path: "cervical",
              element: <RouteOutlet title="Cervix Cancer" route="cervical" />,
              children: [
                { path: "add" },
                { path: "update/:id" },
                { path: ":id" },
              ],
            },
            {
              path: "breast",
              element: <RouteOutlet title="Breast Cancer" route="breast" />,
              children: [
                { path: "add" },
                { path: "update/:id" },
                { path: ":id" },
              ],
            },
            {
              path: "ovarian",
              element: <RouteOutlet title="Ovarian Cancer" route="ovarian" />,
              children: [
                { path: "add" },
                { path: "update/:id" },
                { path: ":id" },
              ],
            },
            {
              path: "uterine",
              element: <RouteOutlet title="Uterine Cancer" route="uterine" />,
              children: [
                { path: "add" },
                { path: "update/:id" },
                { path: ":id" },
              ],
            },
            {
              path: "Osteoporosis",
              element: (
                <RouteOutlet title="Osteoporosis" route="Osteoporosis" />
              ),
              children: [
                {
                  path: "add",
                  element: <AddUpdateOsteoporosisHistory state="add" />,
                },
                {
                  path: "update/:id",
                  element: <AddUpdateOsteoporosisHistory />,
                },
                { path: ":id", element: <PatientOsteoporosisHistory /> },
              ],
            },
            {
              path: "Pre-eclampsia",
              element: (
                <RouteOutlet title="Pre-eclampsia" route="Pre-eclampsia" />
              ),
              children: [
                {
                  path: "add",
                  element: <AddUpdatePreEclampsiaHistory state="add" />,
                },
                {
                  path: "update/:id",
                  element: <AddUpdatePreEclampsiaHistory />,
                },
                { path: ":id", element: <PatientPreEclampsia /> },
              ],
            },
          ],
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer />
    </>
  );
}

export default App;

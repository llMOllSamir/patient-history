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
import PatientBreastCancerHistory from "./components/PatientBreastCancer/PatientBreastCancer";
import AddUpdateBreastCancerHistory from "./components/PatientBreastCancer/AddUpdateBreastCancer";
import PatientOvarianCancerHistory from "./components/PatientOvarianCancer/PatientOvarianCancer";
import AddUpdateOvarianCancer from "./components/PatientOvarianCancer/AddUpdateOvarianCancer";
import ProtectedRoute from "./ProtectedRoute";
import PatientHistory from "./components/History/PatientHistory";
import Search from "./components/Search/Search";
import GynecologicalHistory from "./components/GynecologicalHistory/GynecologicalHistory";
import UpdateGynecologicalHistory from "./components/GynecologicalHistory/UpdateGynecologicalHistory";
import AddGynecologicalHistory from "./components/GynecologicalHistory/AddGynecologicalHistory";
import Dashboard from "./components/Dashboard/Dashboard";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import DoctorHistory from "./components/History/DoctorHistory";
import AddDoctor from "./components/AddDoctor/AddDoctor";

function App() {
    const routes = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                { path: "/", element: <Home /> },
                { path: "/login", element: <Login /> },
                { path: "/reset", element: <ResetPassword /> },
                { path: "/forgotpassword", element: <ForgetPassword /> },
                { path: "/dashboard/:id", element: <Dashboard /> },
                {
                    path: "/patient",
                    element: <PatientLayout />,
                    children: [
                        {
                            path: "search",
                            element: (
                                <ProtectedRoute>
                                    <RouteOutlet
                                        title="Search"
                                        route="search"
                                    />
                                </ProtectedRoute>
                            ),
                            children: [{ index: true, element: <Search /> }],
                        },
                        {
                            path: "personal-information",
                            element: (
                                <RouteOutlet
                                    title="Personal Information"
                                    route="personal-information"
                                />
                            ),
                            children: [
                                {
                                    path: "add",
                                    element: (
                                        <ProtectedRoute>
                                            <AddPatient />
                                        </ProtectedRoute>
                                    ),
                                },
                                {
                                    path: "update",
                                    element: (
                                        <ProtectedRoute>
                                            <UpdatePatient />
                                        </ProtectedRoute>
                                    ),
                                },
                                {
                                    path: ":id",
                                    element: <PersonalInformation />,
                                },
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
                                    element: (
                                        <ProtectedRoute>
                                            <AddUpdateGeneralExamination state="add" />
                                        </ProtectedRoute>
                                    ),
                                },
                                {
                                    path: "update",
                                    element: (
                                        <ProtectedRoute>
                                            <AddUpdateGeneralExamination />
                                        </ProtectedRoute>
                                    ),
                                },
                                {
                                    path: ":id",
                                    element: <GeneralExamination />,
                                },
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
                                {
                                    path: "add",
                                    element: (
                                        <ProtectedRoute>
                                            <AddGynecologicalHistory />
                                        </ProtectedRoute>
                                    ),
                                },
                                {
                                    path: "update",
                                    element: (
                                        <ProtectedRoute>
                                            <UpdateGynecologicalHistory />
                                        </ProtectedRoute>
                                    ),
                                },
                                {
                                    path: ":id",
                                    element: <GynecologicalHistory />,
                                },
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
                                    element: (
                                        <ProtectedRoute>
                                            <AddUpdateObstetricsHistory state="add" />
                                        </ProtectedRoute>
                                    ),
                                },
                                {
                                    path: "update",
                                    element: (
                                        <ProtectedRoute>
                                            <AddUpdateObstetricsHistory />
                                        </ProtectedRoute>
                                    ),
                                },
                                {
                                    path: ":id",
                                    element: <PatientObstetricsHistory />,
                                },
                            ],
                        },
                        {
                            path: "cervical",
                            element: (
                                <RouteOutlet
                                    title="Cervix Cancer"
                                    route="cervical"
                                />
                            ),
                            children: [
                                { path: "add" },
                                { path: "update" },
                                { path: ":id" },
                            ],
                        },
                        {
                            path: "breast",
                            element: (
                                <RouteOutlet
                                    title="Breast Cancer"
                                    route="breast"
                                />
                            ),
                            children: [
                                {
                                    path: "add",
                                    element: (
                                        <ProtectedRoute>
                                            <AddUpdateBreastCancerHistory state="add" />
                                        </ProtectedRoute>
                                    ),
                                },
                                {
                                    path: "update",
                                    element: (
                                        <ProtectedRoute>
                                            <AddUpdateBreastCancerHistory />
                                        </ProtectedRoute>
                                    ),
                                },
                                {
                                    path: ":id",
                                    element: <PatientBreastCancerHistory />,
                                },
                            ],
                        },
                        {
                            path: "ovarian",
                            element: (
                                <RouteOutlet
                                    title="Ovarian Cancer"
                                    route="ovarian"
                                />
                            ),
                            children: [
                                {
                                    path: "add",
                                    element: (
                                        <ProtectedRoute>
                                            <AddUpdateOvarianCancer state="add" />
                                        </ProtectedRoute>
                                    ),
                                },
                                {
                                    path: "update",
                                    element: (
                                        <ProtectedRoute>
                                            <AddUpdateOvarianCancer />
                                        </ProtectedRoute>
                                    ),
                                },
                                {
                                    path: ":id",
                                    element: <PatientOvarianCancerHistory />,
                                },
                            ],
                        },
                        {
                            path: "uterine",
                            element: (
                                <RouteOutlet
                                    title="Uterine Cancer"
                                    route="uterine"
                                />
                            ),
                            children: [
                                { path: "add" },
                                { path: "update" },
                                { path: ":id" },
                            ],
                        },
                        {
                            path: "Osteoporosis",
                            element: (
                                <RouteOutlet
                                    title="Osteoporosis"
                                    route="Osteoporosis"
                                />
                            ),
                            children: [
                                {
                                    path: "add",
                                    element: (
                                        <ProtectedRoute>
                                            <AddUpdateOsteoporosisHistory state="add" />
                                        </ProtectedRoute>
                                    ),
                                },
                                {
                                    path: "update",
                                    element: (
                                        <ProtectedRoute>
                                            <AddUpdateOsteoporosisHistory />
                                        </ProtectedRoute>
                                    ),
                                },
                                {
                                    path: ":id",
                                    element: <PatientOsteoporosisHistory />,
                                },
                            ],
                        },
                        {
                            path: "Pre-eclampsia",
                            element: (
                                <RouteOutlet
                                    title="Pre-eclampsia"
                                    route="Pre-eclampsia"
                                />
                            ),
                            children: [
                                {
                                    path: "add",
                                    element: (
                                        <ProtectedRoute>
                                            <AddUpdatePreEclampsiaHistory state="add" />
                                        </ProtectedRoute>
                                    ),
                                },
                                {
                                    path: "update",
                                    element: (
                                        <ProtectedRoute>
                                            <AddUpdatePreEclampsiaHistory />
                                        </ProtectedRoute>
                                    ),
                                },
                                {
                                    path: ":id",
                                    element: <PatientPreEclampsia />,
                                },
                            ],
                        },
                        {
                            path: "patient-history",
                            element: (
                                <RouteOutlet
                                    title="Patient History"
                                    route="Patient-history"
                                />
                            ),
                            children: [
                                {
                                    path: ":id",
                                    element: (
                                        <ProtectedRoute>
                                            <PatientHistory />
                                        </ProtectedRoute>
                                    ),
                                },
                            ],
                        },
                    ],
                },
                {
                    path: "doctor",
                    children: [
                        { path: "history/:id", element: <DoctorHistory /> },
                        {
                            path: "add/:id?",
                            element: (
                                <ProtectedRoute>
                                    <AddDoctor />
                                </ProtectedRoute>
                            ),
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

import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./slices/patientSlice";
import authReducer from "./slices/authSlice";
import doctorReducer from "./slices/doctorSlice";
import generalExaminationReducer from "./slices/generalExaminationSlice";
import gynecologicalHistoryReducer from "./slices/gynecologicalHistorySlice";
import obstetricsReducer from "./slices/obstetricsSlice";
import osteoporosisReducer from "./slices/osteoporosisSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    patient: patientReducer,
    generalExamination: generalExaminationReducer,
    gynecologicalHistory: gynecologicalHistoryReducer,
    obstetrics: obstetricsReducer,
    osteoporosis: osteoporosisReducer,
  },
});

export default store;

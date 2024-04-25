import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./slices/patientSlice";
import authReducer from "./slices/authSlice";
import doctorReducer from "./slices/doctorSlice";
import generalExaminationReducer from "./slices/generalExaminationSlice";
import gynecologicalHistoryReducer from "./slices/gynecologicalHistorySlice";
import obstetricsReducer from "./slices/obstetricsSlice";
import osteoporosisReducer from "./slices/osteoporosisSlice";
import preEclampsiaReducer from "./slices/preEclampsiaSlice";
import breastReducer from "./slices/breastSlice";
import ovarianReducer from "./slices/ovarianSlice";
import historyReducer from "./slices/history";

const store = configureStore({
  reducer: {
    auth: authReducer,
    doctor: doctorReducer,
    patient: patientReducer,
    generalExamination: generalExaminationReducer,
    gynecologicalHistory: gynecologicalHistoryReducer,
    obstetrics: obstetricsReducer,
    osteoporosis: osteoporosisReducer,
    preEclampsia: preEclampsiaReducer,
    breast: breastReducer,
    ovarian: ovarianReducer,
    history: historyReducer,
  },
});

export default store;

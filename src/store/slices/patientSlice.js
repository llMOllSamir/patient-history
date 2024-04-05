import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: null, patientCode: null };

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    // set patient data
    setPatientData: (state, { payload }) => {
      state.data = payload;
      if (payload) {
        localStorage.setItem("patientData", JSON.stringify(payload));
      } else {
        localStorage.removeItem("patientData");
      }
    },
    // fix patient Code
    fixPatientCode: (state, { payload }) => {
      state.patientCode = payload;
      localStorage.setItem("patientCode", JSON.stringify(payload));
    },
    emptyPatientCode: (state, { payload }) => {
      state.patientCode = null;
      localStorage.removeItem("patientCode");
    },
  },
});

export const { fixPatientCode, emptyPatientCode, setPatientData } =
  patientSlice.actions;
export default patientSlice.reducer;

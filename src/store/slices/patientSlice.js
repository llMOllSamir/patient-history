import { createSlice } from "@reduxjs/toolkit";

const initialState = { data: null, patientCode: null, id: null };

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    // set patient data
    setPatientData: (state, { payload }) => {
      state.data = payload;
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
    setPatientId: (state, { payload }) => {
      state.id = payload.id;
      localStorage.setItem("patientID", JSON.stringify(payload.id));
    },
  },
});

export const {
  fixPatientCode,
  emptyPatientCode,
  setPatientData,
  setPatientId,
} = patientSlice.actions;
export default patientSlice.reducer;

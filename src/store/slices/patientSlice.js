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
    },
    emptyPatientCode: (state, { payload }) => {
      state.patientCode = null;
    },
    setPatientId: (state, { payload }) => {
      state.id = payload.id;
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

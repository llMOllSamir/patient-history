import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  generalExamination: [],
  error: null,
  newGeneralExamination: [],
};



const generalExaminationSlice = createSlice({
  name: "generalExamination",
  initialState,
  reducers: {
    // Add general examination data
    addGeneralExaminationData: (state, { payload }) => {
      state.newGeneralExamination = payload;
    },
  },

});

export const { addGeneralExaminationData } = generalExaminationSlice.actions;
export default generalExaminationSlice.reducer;

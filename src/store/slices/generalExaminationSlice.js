import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Http from "../../fetchingRequest";
import notify from "../../utilities/alert-toastify";

const initialState = {
  loading: false,
  generalExamination: null,
  error: null,
};

// update General Examination data
export const updateGeneralExamination = createAsyncThunk(
  "generalExamination/updateGeneralExamination",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await Http().put(`/general-examination/${id}`, data);
      if (response.status === 200) {
        notify("تم تحديث الفحص بنجاح", "success");
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add patient data
export const addGeneralExamination = createAsyncThunk(
  "generalExamination/addGeneralExamination",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await Http().post(`/general-examination/`, data);
      if (response.status === 201) {
        notify("تم إضافة الفحص بنجاح", "success");
      }
      return response.data;
    } catch (error) {
      notify("حدث خطأ أثناء تحديث الفحص", "error");
      return rejectWithValue(error.message);
    }
  }
);

const generalExaminationSlice = createSlice({
  name: "generalExamination",
  initialState,
  reducers: {
    // Add general examination data
    setGenralExamination: (state, { payload }) => {
      state.generalExamination = payload;
    },
  },
  extraReducers: (builder) => {
    // Add General Examination data
    builder.addCase(addGeneralExamination.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addGeneralExamination.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.generalExamination = payload.examination;
    });
    builder.addCase(addGeneralExamination.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { setGenralExamination } = generalExaminationSlice.actions;
export default generalExaminationSlice.reducer;

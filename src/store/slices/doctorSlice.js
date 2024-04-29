import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetching from "../../fetchingRequest";

const initialState = { data: [], history: [], newDoctor: {} };

export const addDoctor = createAsyncThunk('doctor/add',async (values, _thunkAPI)=>{
  try{
    const response = await  fetching().post(
      '/doctors',
      values,{
      headers: {
        "Content-Type": "application/json"
      }
    })
    return response
  }catch(e){
    console.log(e)
  }
})

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    getArray(state, actions) {
      return state.data;
    },
    setDoctorsData: (state, { payload }) => {
      state.data = payload;
    },
    setHistory: (state, { payload }) => {
      state.history = payload;
    },
    deleteDoctor: (state, { payload }) => {
      const newList = state.data.filter((item) => item.id !== payload);
      state.data = newList;
    },
    addAdminActivity: (state, { payload }) => {
      state.history.unshift(payload);
    },
  },
  extraReducers: (builder)=>{
    builder.addCase(addDoctor.fulfilled,(state,action)=>{
      console.log(action)
      console.log(state)

    })
  }
});

export const {
  getArray,
  setDoctorsData,
  setHistory,
  deleteDoctor,
  addAdminActivity,
} = doctorSlice.actions;
export default doctorSlice.reducer;

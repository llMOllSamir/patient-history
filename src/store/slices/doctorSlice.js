import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetching from "../../fetchingRequest";

const initialState = {
    data: [],
    history: [],
    newDoctorState: {},
    getDoctorState: {},
    updateDoctorState: {},
};

export const addDoctor = createAsyncThunk(
    "doctor/add",
    async (values, _thunkAPI) => {
        try {
            return JSON.stringify(
                await fetching().post("/doctors", values, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            );
        } catch (e) {
            return _thunkAPI.rejectWithValue(JSON.stringify(e));
        }
    }
);

export const getDoctor = createAsyncThunk(
    "doctor/get-doctor",
    async (id, _thunkAPI) => {
        try {
            return JSON.stringify(await fetching().get(`/doctors/${id}`));
        } catch (e) {
            return _thunkAPI.rejectWithValue(JSON.stringify(e));
        }
    }
);
export const updateDoctor = createAsyncThunk(
    "doctor/update-doctor",
    async ({ id, values }, _thunkAPI) => {
        try {
            return JSON.stringify(
                await fetching().put(`/doctors/${id}`, values)
            );
        } catch (e) {
            return _thunkAPI.rejectWithValue(JSON.stringify(e));
        }
    }
);

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
        resetGetDoctor: (state) => {
            state.getDoctorState = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(addDoctor.fulfilled, (state, action) => {
            console.log(action.payload);
            state.newDoctorState = JSON.parse(action.payload);
        });
        builder.addCase(addDoctor.rejected, (state, action) => {
            console.log(action.payload);
            state.newDoctorState = JSON.parse(action.payload);
        });
        builder.addCase(getDoctor.fulfilled, (state, action) => {
            state.getDoctorState = JSON.parse(action.payload);
        });
        builder.addCase(updateDoctor.fulfilled, (state, action) => {
            console.log(JSON.parse(action.payload));
            state.updateDoctorState = JSON.parse(action.payload);
        });
    },
});

export const {
    getArray,
    setDoctorsData,
    setHistory,
    deleteDoctor,
    addAdminActivity,
    resetGetDoctor,
} = doctorSlice.actions;
export default doctorSlice.reducer;

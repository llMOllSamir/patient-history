import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import fetching from "../../fetchingRequest";

const initialState = {
    data: [],
    history: [],
    newDoctor: {},
    getDoctor: {},
    updateDoctor: {},
};

export const addDoctor = createAsyncThunk(
    "doctor/add",
    async (values, _thunkAPI) => {
        try {
            return JSON.stringify(await fetching().post("/doctors", values, {
                headers: {
                    "Content-Type": "application/json",
                },
            }));
        } catch (e) {
            return _thunkAPI.rejectWithValue(e);
        }
    }
);

export const getDoctor = createAsyncThunk(
    "doctor/get-doctor",
    async (id, _thunkAPI) => {
        try {
            return JSON.stringify(await fetching().get(`/doctors/${id}`));
        } catch (e) {
            return _thunkAPI.rejectWithValue(e);
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
            return _thunkAPI.rejectWithValue(e);
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
    },
    extraReducers: (builder) => {
        builder.addCase(addDoctor.fulfilled, (state, action) => {
            state.newDoctor = JSON.parse(action.payload);
        });
        builder.addCase(getDoctor.fulfilled, (state, action) => {
            state.getDoctor = JSON.parse(action.payload);
        });
        builder.addCase(updateDoctor.fulfilled, (state, action) => {
            console.log(JSON.parse(action.payload))
            state.updateDoctor = JSON.parse(action.payload);
        });
    },
});

export const {
    getArray,
    setDoctorsData,
    setHistory,
    deleteDoctor,
    addAdminActivity,
} = doctorSlice.actions;
export default doctorSlice.reducer;

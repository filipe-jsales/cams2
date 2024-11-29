import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/axiosConfig";
import { RootState } from "../types";

export interface Cam {
  id: number;
  name: string;
  status: string;
}

export interface CamsState {
  cams: Cam[];
  loading: boolean;
  error: string | null;
}

const initialState: CamsState = {
  cams: [],
  loading: false,
  error: null,
};

export const fetchCams = createAsyncThunk("cams/fetchCams", async () => {
  const response = await api.get(`${import.meta.env.VITE_API_BASE_URL}/cams`);
  return response.data as Cam[];
});

export const deleteCam = createAsyncThunk(
  "cams/deleteCam",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`${import.meta.env.VITE_API_BASE_URL}/cams/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        // @ts-expect-error omitindo o tipo para simplificar
        error.response?.data?.message || "Erro ao deletar a câmera."
      );
    }
  }
);

const camSlice = createSlice({
  name: "cams",
  initialState,
  reducers: {
    addCam(state, action: PayloadAction<Cam>) {
      state.cams.push(action.payload);
    },
    removeCam(state, action: PayloadAction<number>) {
      state.cams = state.cams.filter((cam) => cam.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCams.fulfilled, (state, action) => {
        state.cams = action.payload;
        state.loading = false;
      })
      .addCase(fetchCams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao carregar câmeras.";
      })
      .addCase(deleteCam.fulfilled, (state, action) => {
        state.cams = state.cams.filter((cam) => cam.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteCam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addCam, removeCam } = camSlice.actions;

export const selectCams = (state: RootState) => state.cams;

export default camSlice.reducer;

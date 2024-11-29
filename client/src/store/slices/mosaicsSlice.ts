import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/axiosConfig";
import { RootState } from "../types";

interface Mosaic {
  id: number;
  type: string;
  name: string;
  capacity: number;
  isActive: boolean;
  cameraCount: number;
  userCount: number;
}

export interface MosaicsState {
  mosaics: Mosaic[];
  loading: boolean;
  error: string | null;
}

const initialState: MosaicsState = {
  mosaics: [],
  loading: false,
  error: null,
};

export const fetchMosaics = createAsyncThunk("mosaics/fetchMosaics", async () => {
  const response = await api.get(
    `${import.meta.env.VITE_API_BASE_URL}/mosaics`
  );
  return response.data as Mosaic[];
});

export const deleteMosaic = createAsyncThunk(
  "mosaics/deleteMosaic",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`${import.meta.env.VITE_API_BASE_URL}/mosaics/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        // @ts-expect-error omitindo o tipo para simplificar
        error.response?.data?.message || "Erro ao deletar o mosaico."
      );
    }
  }
);

const mosaicSlice = createSlice({
  name: "mosaics",
  initialState,
  reducers: {
    addMosaic(state, action: PayloadAction<Mosaic>) {
      state.mosaics.push(action.payload);
    },
    removeMosaic(state, action: PayloadAction<number>) {
      state.mosaics = state.mosaics.filter((mosaic) => mosaic.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMosaics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMosaics.fulfilled, (state, action) => {
        state.mosaics = action.payload;
        state.loading = false;
      })
      .addCase(fetchMosaics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao carregar mosaicos.";
      })
      .addCase(deleteMosaic.fulfilled, (state, action) => {
        state.mosaics = state.mosaics.filter((mosaic) => mosaic.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteMosaic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addMosaic, removeMosaic } = mosaicSlice.actions;

export const selectMosaics = (state: RootState) => state.mosaics;

export default mosaicSlice.reducer;

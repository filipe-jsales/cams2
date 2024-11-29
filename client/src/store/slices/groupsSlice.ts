import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/axiosConfig";
import { RootState } from "../types";

export interface Group {
  id: number;
  name: string;
  usersQuantity: number;
  isDefault: boolean;
  isActive: boolean;
  observations?: string;
}

export interface GroupsState {
  groups: Group[];
  loading: boolean;
  error: string | null;
}

const initialState: GroupsState = {
  groups: [],
  loading: false,
  error: null,
};

export const fetchGroups = createAsyncThunk("groups/fetchGroups", async () => {
  const response = await api.get(`${import.meta.env.VITE_API_BASE_URL}/groups`);
  return response.data as Group[];
});

export const deleteGroup = createAsyncThunk(
  "groups/deleteGroup",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`${import.meta.env.VITE_API_BASE_URL}/groups/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        // @ts-expect-error omitindo o tipo para simplificar
        error.response?.data?.message || "Erro ao deletar o grupo."
      );
    }
  }
);

const groupSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    addGroup(state, action: PayloadAction<Group>) {
      state.groups.push(action.payload);
    },
    removeGroup(state, action: PayloadAction<number>) {
      state.groups = state.groups.filter(
        (group) => group.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groups = action.payload;
        state.loading = false;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao carregar grupos.";
      })
      .addCase(deleteGroup.fulfilled, (state, action) => {
        state.groups = state.groups.filter(
          (group) => group.id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addGroup, removeGroup } = groupSlice.actions;

export const selectGroups = (state: RootState) => state.groups;

export default groupSlice.reducer;

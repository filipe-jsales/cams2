import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosConfig";
import { RootState } from "../types";

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await api.get(
    `${import.meta.env.VITE_API_BASE_URL}/users`
  );
  return response.data as User[];
});

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id: number, { rejectWithValue }) => {
    try {
      await api.delete(`${import.meta.env.VITE_API_BASE_URL}/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        // @ts-expect-error Omitindo o tipo para simplificar
        error.response?.data?.message || "Erro ao deletar o usuário."
      );
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    removeUser(state, action: PayloadAction<number>) {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
    toggleUserStatus(state, action: PayloadAction<number>) {
      const user = state.users.find((user) => user.id === action.payload);
      if (user) {
        user.status = user.status === "active" ? "inactive" : "active";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao carregar usuários.";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
        state.loading = false;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addUser, removeUser, toggleUserStatus } = userSlice.actions;

export const selectUsers = (state: RootState) => state.users;

export default userSlice.reducer;

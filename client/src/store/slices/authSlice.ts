import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axiosConfig";
import { RootState } from "../types";

console.log("authSlice is being imported");
export interface AuthState {
  user: {
    id: string;
    email: string;
    roles: string[];
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      console.log('response', response)
      localStorage.setItem("token", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data.access_token;
    } catch (error) {
      return rejectWithValue(
        // @ts-expect-error omitindo o tipo para simplificar
        error.response?.data?.message || "Erro ao fazer login."
      );
    }
  }
);

export const fetchProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        // @ts-expect-error omitindo o tipo para simplificar
        error.response?.data?.message || "Erro ao buscar perfil."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao fazer login.";
      })
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar perfil.";
      });
  },
});

export const { logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;

// import {
//   createSlice,
//   createAsyncThunk,
//   type PayloadAction,
// } from '@reduxjs/toolkit';

// interface AuthState {
//   user: User | null;
//   token: string | null;
//   loading: boolean;
//   error: string | null;
//   isAuthenticated: boolean;
// }

// const initialState: AuthState = {
//   user: null,
//   token: localStorage.getItem('token'),
//   loading: false,
//   error: null,
//   isAuthenticated: !!localStorage.getItem('token'),
// };

// export const login = createAsyncThunk(
//   'auth/login',
//   async (
//     { email, password }: { email: string; password: string },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await authService.login(email, password);
//       localStorage.setItem('token', response.token);
//       // Immediately fetch current user (with role + permissions) after login
//       const me = await usersService.getCurrent();

//       // Fetch all permissions and update the local constants
//       const allPermissions = await permissionsService.getAll();
//       if (allPermissions && Array.isArray(allPermissions)) {
//         setPermissions(allPermissions);
//       }

//       return { token: response.token, user: me };
//     } catch (error: unknown) {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       return rejectWithValue(
//         (error as any).response?.data?.message || 'Login failed'
//       );
//     }
//   }
// );

// export const logout = createAsyncThunk('auth/logout', async () => {
//   try {
//     await authService.logout();
//   } catch (error) {
//     console.error('Logout error:', error);
//   } finally {
//     localStorage.removeItem('token');
//   }
// });

// export const fetchCurrentUser = createAsyncThunk(
//   'auth/fetchCurrentUser',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const state = getState() as { auth: { token: string | null } };
//       const token = state.auth.token || localStorage.getItem('token');
//       if (!token) {
//         return rejectWithValue('No auth token found');
//       }
//       const response = await usersService.getCurrent();

//       // Fetch all permissions and update the local constants on reload/re-fetch
//       const allPermissions = await permissionsService.getAll();
//       if (allPermissions && Array.isArray(allPermissions)) {
//         setPermissions(allPermissions);
//       }

//       return response;
//     } catch (error: unknown) {
//       return rejectWithValue(
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         (error as any).response?.data?.message || 'Failed to load current user'
//       );
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//     setUser: (state, action: PayloadAction<User | null>) => {
//       state.user = action.payload;
//       state.isAuthenticated = true;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.token = action.payload.token;
//         state.user = action.payload.user;
//         state.isAuthenticated = true;
//         state.error = null;
//       })
//       .addCase(login.rejected, (state, action) => {
//         // state.loading = false;
//         state.error = action.payload as string;
//         state.isAuthenticated = false;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.user = null;
//         state.token = null;
//         state.isAuthenticated = false;
//       })
//       .addCase(fetchCurrentUser.fulfilled, (state, action) => {
//         state.user = action.payload;
//       });
//   },
// });

// export const { clearError, setUser } = authSlice.actions;
// export default authSlice.reducer;

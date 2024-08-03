import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронная функция для регистрации пользователя
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('email', userData.email);
      formData.append('password', userData.password);
      if (userData.avatar) {
        formData.append('avatar', userData.avatar);
      }

      const response = await fetch('http://localhost:3001/api/users/Registration', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to register');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  name: '',
  email: '',
  password: '',
  avatar: null,
  status: 'idle',
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    clearUserData: (state) => {
      state.name = '';
      state.email = '';
      state.password = '';
      state.avatar = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.name = '';
        state.email = '';
        state.password = '';
        state.avatar = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setName, setEmail, setPassword, setAvatar, clearUserData } = userSlice.actions;

export default userSlice.reducer;

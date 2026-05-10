import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

const initialState = {
  progress: {},
  loading: false,
  error: null,
};

export const updateProgress = createAsyncThunk(
  'progress/updateProgress',
  async ({ videoId, watchedDuration, totalDuration }, { rejectWithValue }) => {
    try {
      const response = await api.post(`/progress/${videoId}`, {
        watchedDuration,
        totalDuration,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update progress');
    }
  }
);

export const fetchUserProgress = createAsyncThunk(
  'progress/fetchUserProgress',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/progress/user');
      return response.data.progress;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch progress');
    }
  }
);

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Update Progress
    builder
      .addCase(updateProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress[action.payload.videoId] = action.payload;
      })
      .addCase(updateProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Fetch User Progress
    builder
      .addCase(fetchUserProgress.fulfilled, (state, action) => {
        state.progress = action.payload;
      });
  },
});

export const { clearError } = progressSlice.actions;
export default progressSlice.reducer;

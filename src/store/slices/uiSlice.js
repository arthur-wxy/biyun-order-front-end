import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    siderCollapsed: false,
    theme: 'light',
    loading: false
  },
  reducers: {
    toggleSider: (state) => {
      state.siderCollapsed = !state.siderCollapsed;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { toggleSider, setTheme, setLoading } = uiSlice.actions;
export default uiSlice.reducer; 
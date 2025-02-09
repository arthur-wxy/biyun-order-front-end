import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useInternalApi } from '../../network/internalApi';

export const fetchOrders = createAsyncThunk(
  'order/fetchOrders',
  async (params) => {
    const api = useInternalApi();
    const response = await api.get('/orders', { params });
    return response.data;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer; 
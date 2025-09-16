import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      state.list.push({ ...action.payload, id: Date.now().toString() });
    },
    clearTransactions: (state) => {
      state.list = [];
    },
  },
});

export const { addTransaction, clearTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;

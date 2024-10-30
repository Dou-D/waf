import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface disposalColumnType {
  disposalIP: string;
  disposalType: string;
  disposalProtocol: string;
  disposalTime: string;
}

export const disposalSlice = createSlice({
  name: 'upload',
  initialState: {
    columns: [] as disposalColumnType[],
  },
  reducers: {
    addColData: (state, action: PayloadAction<disposalColumnType>) => {
      state.columns.push(action?.payload);
    },
  },
});

export const { addColData } = disposalSlice.actions

export default disposalSlice.reducer;

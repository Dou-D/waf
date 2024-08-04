import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        value: false
    },
    reducers: {
        change: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload
            console.log("🚀 ~ state.value:", state.value)
            
        }
    }
})

export const { change } = uploadSlice.actions;

export default uploadSlice.reducer;
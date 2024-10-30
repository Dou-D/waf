import { configureStore } from '@reduxjs/toolkit';
import uploadReducer from './modules/uploadSlice'
import disposalReducer from './modules/disposalSlice'
const store = configureStore({
    reducer: {
        upload: uploadReducer,
        disposal: disposalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
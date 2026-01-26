import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '@/features/counter/counterSlice';
import { customerApi } from '@/features/customer/customerApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
        [customerApi.reducerPath]: customerApi.reducer,
        counter: counterReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
      .concat(customerApi.middleware)
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
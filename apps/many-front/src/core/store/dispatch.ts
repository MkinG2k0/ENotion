import { store } from './store'

import type { AnyAction, AsyncThunkAction } from '@reduxjs/toolkit'

export const dispatch = (func: AnyAction | AsyncThunkAction<any, any, any>) => store.dispatch(func)

// export const storeDispatch = store.dispatch
// TODO AnyAction error thunk
// export type AppDispatch = typeof store.dispatch

import { rtqApi } from './rtq-api'

import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
	[rtqApi.reducerPath]: rtqApi.reducer,
})

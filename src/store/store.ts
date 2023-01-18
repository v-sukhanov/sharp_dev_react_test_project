import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { baseApi } from './base.api';
import { setupListeners } from '@reduxjs/toolkit/query';
import { tokenReducer } from './token.slice';
import { protectedApi } from './protected.api';

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		[protectedApi.reducerPath]: protectedApi.reducer,
		token: tokenReducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
		baseApi.middleware,
		protectedApi.middleware
	])
});


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
setupListeners(store.dispatch)
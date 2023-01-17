import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const TOKEN_KEY = 'TOKEN_KEY';

export interface ITokenState {
	id_token: string | null;
}

const initialState: ITokenState = {
	id_token: localStorage.getItem(TOKEN_KEY)
}

export const tokenSlice = createSlice({
	name: 'token',
	initialState,
	reducers: {
		addToken: (state, action: PayloadAction<string>) => {
			state.id_token = action.payload;
			localStorage.setItem(TOKEN_KEY, action.payload)
		},
		removeToken: (state, action: PayloadAction) => {
			state.id_token = null;
			localStorage.removeItem(TOKEN_KEY)
		}
	}
})

export const tokenActions = tokenSlice.actions;
export const tokenReducer = tokenSlice.reducer;

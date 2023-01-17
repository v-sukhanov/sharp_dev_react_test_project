import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { tokenActions } from './token.slice';
import { bindActionCreators } from '@reduxjs/toolkit';

const actions = {
	...tokenActions
}

export const useActions = () => {
	const dispatch = useDispatch<AppDispatch>();
	return bindActionCreators(actions, dispatch);
}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

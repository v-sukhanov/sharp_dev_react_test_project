import { BaseQueryApi, BaseQueryFn, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	ICreateTransactionRequest, ICreateTransactionResponse, ICreateTransactionToken,
	ISignInRequest,
	ISignInResponse,
	ISignUpRequest,
	ISignUpResponse, IUser,
	IUserInfoResponse,
	IUsersRequest
} from '../models/auth';
import { RootState, store } from './store';
import { useActions } from './hooks';
import { tokenActions } from './token.slice';
import { useNavigate } from 'react-router-dom';


const baseQuery = fetchBaseQuery({
	baseUrl: 'http://193.124.114.46:3001/api/protected',
	prepareHeaders: (headers, { getState, endpoint }) => {
		const token = (getState() as RootState).token.id_token

		headers.set('Authorization', `Bearer ${token}`)
		return headers
	},
})
const baseQueryWithReauth = async (args: any, api: BaseQueryApi, extraOptions: any) => {
	let result = await baseQuery(args, api, extraOptions)
	// @ts-ignore
	if (result?.error?.originalStatus === 401) {
		store.dispatch(tokenActions.removeToken())
	}
	return result
}

export const protectedApi = createApi({
	reducerPath: 'protected/api',
	baseQuery: baseQueryWithReauth,
	endpoints: (build) => ({
		userInfo: build.query<IUserInfoResponse, void>({
			query: () => ({
				url: '/user-info',
				method: 'get'
			}),
			transformResponse: (response: { user_info_token: IUserInfoResponse }) => response.user_info_token
		}),
		users: build.query<IUser[], IUsersRequest>({
			query: (request: IUsersRequest) => ({
				url: '/users/list',
				body: request,
				method: 'post'
			})
		}),
		createTransaction: build.query<ICreateTransactionToken, ICreateTransactionRequest>({
			query: (request: ICreateTransactionRequest) => ({
				url: '/transactions',
				body: request,
				method: 'post'
			}),
			transformResponse: (response: ICreateTransactionResponse) => response.trans_token
		}),
		getTransaction: build.query<ICreateTransactionToken[], void>({
			query: () => ({
				url: '/transactions',
				method: 'get'
			}),
			transformResponse: (response: {trans_token: ICreateTransactionToken[]}) => response.trans_token.reverse().map(x => {
				return {
					...x,
					amount: x.amount * -1
				}
			})
		})
	})
})
export const {useUserInfoQuery, useLazyUserInfoQuery, useLazyUsersQuery, useLazyCreateTransactionQuery, useGetTransactionQuery, useLazyGetTransactionQuery} = protectedApi

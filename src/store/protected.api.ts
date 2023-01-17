import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISignInRequest, ISignInResponse, ISignUpRequest, ISignUpResponse, IUserInfoResponse } from '../models/auth';
import { RootState } from './store';


export const protectedApi = createApi({
	reducerPath: 'base/api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://193.124.114.46:3001/api/protected',
		prepareHeaders: (headers, { getState, endpoint }) => {
			const token = (getState() as RootState).token.id_token

			headers.set('Authorization', `Bearer ${token}`)
			return headers
		}
	}),
	endpoints: (build) => ({
		userInfo: build.query<IUserInfoResponse, void>({
			query: () => ({
				url: '/user-info',
				method: 'get'
			}),
			transformResponse: (response: { user_info_token: IUserInfoResponse }) => response.user_info_token
		})
	})
})
export const {useUserInfoQuery} = protectedApi

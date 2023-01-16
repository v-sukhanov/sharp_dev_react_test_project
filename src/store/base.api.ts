import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISignUpRequest } from '../models/auth';


export const baseApi = createApi({
	reducerPath: 'base/api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://193.124.114.46:3001'
	}),
	endpoints: (build) => ({
		signUp: build.query<any, any>({
			query: (request: ISignUpRequest) => ({
				url: '/users',
				body: request,
				method: 'post'
			})
		})
	})
})
export const {useLazySignUpQuery} = baseApi

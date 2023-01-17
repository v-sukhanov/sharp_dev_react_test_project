import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ISignInRequest, ISignInResponse, ISignUpRequest, ISignUpResponse } from '../models/auth';


export const baseApi = createApi({
	reducerPath: 'base/api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://193.124.114.46:3001'
	}),
	endpoints: (build) => ({
		signUp: build.query<ISignUpResponse, ISignUpRequest>({
			query: (request: ISignUpRequest) => ({
				url: '/users',
				body: request,
				method: 'post'
			})
		}),
		signIn: build.query<ISignInResponse, ISignInRequest>({
			query: (request: ISignInRequest) => ({
				url: '/sessions/create',
				body: request,
				method: 'post'
			})
		}),
		userInfo: build.query<ISignInResponse, ISignInRequest>({
			query: (request: ISignInRequest) => ({
				url: '/sessions/create',
				body: request,
				method: 'post'
			})
		})
	})
})
export const {useLazySignUpQuery, useLazySignInQuery} = baseApi

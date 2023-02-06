import { baseApi } from '../base.api';
import { IUserInfoResponse } from '../../models/user';



const _apiWithApiWithUserEndpoints = baseApi.enhanceEndpoints({addTagTypes: ['User']}).injectEndpoints({
	endpoints: (build) => ({
		userInfo: build.query<IUserInfoResponse, void>({
			query: () => ({
				url: '/api/protected/user-info',
				method: 'get'
			}),
			transformResponse: (response: { user_info_token: IUserInfoResponse }) => response.user_info_token
		})
	})
})

export const {useUserInfoQuery, useLazyUserInfoQuery} = _apiWithApiWithUserEndpoints;
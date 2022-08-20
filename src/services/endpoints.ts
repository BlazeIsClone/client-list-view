const { APP_IDP_API_ENTRYPOINT, APP_IDP_VIEW_ENTRYPOINT } = import.meta.env;

export const endpoints = {
	refreshToken: `${APP_IDP_API_ENTRYPOINT}/auth/refresh-token`,
	login: `${APP_IDP_VIEW_ENTRYPOINT}/login?redirect_uri=${window.location.href}`,

	client: (id: string | undefined) => `/clients/${id}`,
	clients: '/clients',
	companies: '/companies',
};

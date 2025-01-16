export const environment = {
  production: true,
  auth0: {
    domain: process.env['DOMAIN'],
    clientId: process.env['CLIENT_ID'],
  },
  baseURL: process.env['BASE_URL'],
};

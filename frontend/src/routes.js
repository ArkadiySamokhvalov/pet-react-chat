const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  homePagePath: () => '/',
  loginPagePath: () => '/login',
};

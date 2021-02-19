const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'JWT_TOKEN_SECRET':
        return 'secret'
      case 'JWT_TOKEN_EXPIRATION_TIME':
        return '3600'
      case 'JWT_REFRESH_TOKEN_SECRET':
        return 'secret-refresh'
      case 'JWT_REFRESH_TOKEN_EXPIRATION_TIME':
        return '10800'
    }
  }
}

export default mockedConfigService;
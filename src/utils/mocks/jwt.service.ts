const mockedJwtService = {
  sign: () => 'newtoken',
  verify: (token: string, options: Record<string, string>) => ({
    email: '',
    sub: 1
  })
}

export default mockedJwtService;
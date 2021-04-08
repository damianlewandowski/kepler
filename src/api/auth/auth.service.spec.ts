import { UsersService } from './../users/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import mockedConfigService from 'utils/mocks/config.service';
import mockedJwtService from 'utils/mocks/jwt.service';
import { Role } from 'api/common/enums/role.enum';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService, 
        UsersService,
        {
          provide: ConfigService,
          useValue: mockedConfigService
        },
        {
          provide: JwtService,
          useValue: mockedJwtService
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateTokens', () => {
    it('should generate 2 tokens', async () => {
      const payload = { email: 'somemail@gmail.com', sub: 1 };
      const tokens = service.generateTokens(payload);
      
      expect(Object.keys(tokens).length).toBe(2);
    })
  })

  describe('login', () => {
    it('should generate 2 tokens', async () => {
      const payload = { id: 1, email: 'somemail@gmail.com', password: 'somepassword123', roles: [Role.User] } as User;
      const tokens = await service.login(payload);
      
      expect(Object.keys(tokens).length).toBe(2);
    })
  })

  describe('refreshTokens', () => {
    it('should take refresh token and return two tokens', async () => {
      const refreshToken = 'refreshtoken';
      const tokens = service.refreshTokens(refreshToken);
      
      expect(Object.keys(tokens).length).toBe(2);
    })
  })

  describe('refreshTokens', () => {
    it('should take refresh token and generate new ones', async () => {
      const refreshToken = 'refreshTokenlallaal';
      const tokens = service.refreshTokens(refreshToken);
      
      expect(Object.keys(tokens).length).toBe(2);
      expect(tokens.refresh_token).not.toBe(refreshToken);
    })
  })
});

import { UsersService, User } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export type ValidateUserResult = Omit<User, "password"> | null;
export type Tokens = {
  jwt_token: string;
  refresh_token: string;
}

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async validateUser(username: string, pass: string): Promise<ValidateUserResult> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  generateTokens(payload: Record<string, unknown>): Tokens {
    const jwt_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_TOKEN_SECRET,
      expiresIn: process.env.JWT_TOKEN_EXPIRATION_TIME
    })
    const refresh_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME
    })
    return {
      jwt_token,
      refresh_token
    }
  }

  async login(user: User): Promise<Tokens> {
    const payload = { username: user.username, sub: user.userId }
    const tokens = this.generateTokens(payload);
    return tokens;
  }

  refreshTokens(refreshToken: string): Tokens {
    try {
      const { username, sub } = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET
      });
      const payload = { username, sub }
      return this.generateTokens(payload);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

}
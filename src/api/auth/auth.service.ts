import { UsersService } from './../users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import User from 'api/users/entities/user.entity';

export type Tokens = {
  jwt_token: string;
  refresh_token: string;
}

export type UserWithoutPassword = Omit<User, "password">;

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService, private configService: ConfigService) { }

  async validateUser(email: string, pass: string): Promise<UserWithoutPassword> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (user && await argon2.verify(user.password, pass)) {
        const { password, ...rest } = user;
        return rest;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  generateTokens(payload: Record<string, unknown>): Tokens {
    const jwt_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_TOKEN_EXPIRATION_TIME'),
    })
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    })
    return {
      jwt_token,
      refresh_token
    }
  }

  async login(user: User): Promise<Tokens> {
    const {password, id, ...rest} = user;
    const payload = { sub: id, ...rest }
    const tokens = this.generateTokens(payload);
    return tokens;
  }

  refreshTokens(refreshToken: string): Tokens {
    try {
      const { email, sub } = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_TOKEN_SECRET
      });
      const payload = { email, sub }
      return this.generateTokens(payload);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }

}
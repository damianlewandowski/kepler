import { AuthService, ValidateUserResult } from './auth.service';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      username: 'string',
      password: 'string',
    });
  }

  async validate(username: string, password: string): Promise<ValidateUserResult> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
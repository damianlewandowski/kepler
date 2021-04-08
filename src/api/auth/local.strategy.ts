import { AuthService, UserWithoutPassword } from './auth.service';
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UnauthorizedException, Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      password: 'string',
    });
  }

  async validate(email: string, password: string): Promise<UserWithoutPassword> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
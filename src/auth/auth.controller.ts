import { Body, Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { Tokens, AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('login/token/refresh')
  async refreshToken(@Body('refresh_token') refreshToken): Promise<Tokens> {
    return this.authService.refreshTokens(refreshToken);
  }
}

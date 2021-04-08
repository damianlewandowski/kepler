import { ConfigService } from '@nestjs/config';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Role } from 'api/common/enums/role.enum';

type Payload = {
  sub: number,
  email: string;
  roles: Role[],
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_TOKEN_SECRET')
    })
  }

  async validate(payload: Payload) {

    return { id: payload.sub, email: payload.email, roles: payload.roles }
  }
}
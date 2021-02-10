import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const x = 'damian';
    return 'Hello World!' + x;
  }
}

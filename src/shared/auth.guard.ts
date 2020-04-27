import {
  CanActivate,
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    //Burada token var mı yok mu kontrollu yapiyoruz
    if (!request.headers.authorization) {
      return false;
    }
    //burada ise token kontrollu yapıyoruz yani bu  token geçerli mi  ?
      request.user = await this.validateToken(request.headers.authorization);
    return true;
  }

  async validateToken(auth: string) {
    if (auth.split(' ')[0] !== 'Bearer') {
      throw new HttpException('Invalid token ', HttpStatus.FORBIDDEN);
    }

    const token = auth.split(' ')[1];

    try {
      const decoded:any = await jwt.verify(token, process.env.SECRET);
      return decoded;
    } catch (error) {
      const message = 'Token error ' + (error.message || error.name);
      throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}

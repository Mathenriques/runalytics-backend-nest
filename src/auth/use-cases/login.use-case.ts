import { Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UserPayload } from '../models/UserPayload.model';
import { AccessToken } from '../models/AccessToken.model';

export class LoginUseCase {
  @Inject()
  private readonly jwtService: JwtService;

  async execute(user: User): Promise<AccessToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
    };
  }
}

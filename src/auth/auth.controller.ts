import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest.model';
import { LoginUseCase } from './use-cases/login.use-case';
import { isPublic } from './decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
  @Inject(LoginUseCase)
  private readonly loginUseCase: LoginUseCase;

  @Post('sign-in')
  @isPublic()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  login(@Request() req: AuthRequest) {
    return this.loginUseCase.execute(req.user);
  }
}

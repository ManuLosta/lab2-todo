import { Body, Controller, Post } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() userDto: RegisterDto) {
    console.log(userDto);
    return this.authService.register(userDto.username, userDto.password);
  }

  @Post('login')
  login(@Body() userDto: RegisterDto) {
    return this.authService.signIn(userDto.username, userDto.password);
  }
}

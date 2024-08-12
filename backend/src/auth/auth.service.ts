import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);

    if (!user) throw new NotFoundException('Username not found');

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new UnauthorizedException();
    }

    const payload = { userId: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
      username: user.username,
    };
  }

  async register(username: string, password: string): Promise<void> {
    const dup = await this.usersService.findOneByUsername(username);

    if (dup) throw new BadRequestException('Username already taken');

    const encryptedPass = await hash(password, 10);
    this.usersService.create(username, encryptedPass);
  }
}

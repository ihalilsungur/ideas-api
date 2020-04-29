import { Controller, Get, Post, Body, UsePipes, UseGuards, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from './user.decorator';

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('api/users')
  @UseGuards(new AuthGuard())
  showAllUsers(@User() user,@Query('page')page) {
    return this.userService.showAll(page);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    return this.userService.userLogin(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    return this.userService.userRegister(data);
  }
}

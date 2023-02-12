import { Serialize } from '@app/shared/interceptors/serialize.interceptor';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserDecorator } from './decorators/user.decorator';
import { UserExposeDto } from './dto/expose_user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET USERS
  @Get()
  @Serialize(UserExposeDto)
  async findUsers() {
    return this.userService.findUsers();
  }

  // GET USER BY ID
  @Get(':id')
  @Serialize(UserExposeDto)
  async findUser(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.findUserById(id);
  }

  // UPLOAD AVATAR
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file'))
  @Serialize(UserExposeDto)
  @Post('/upload-avatar')
  async uploadAvatar(
    @UserDecorator('id') user_id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.userService.uploadAvatar(user_id, file);
  }
}

import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get() // GET /users or /users?role=value&age=value
	index(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
		return this.usersService.index(role);
	}

	@Get(':id') // GET /users/:id
	show(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.show(id);
	}

	@Post() // POST /users
	create(
		@Body(ValidationPipe)
		user: CreateUserDto,
	) {
		return this.usersService.create(user);
	}

	@Patch(':id') // PATCH /users/:id
	update(
		@Param('id', ParseIntPipe) id: number,
		@Body(ValidationPipe)
		userUpdate: UpdateUserDto,
	) {
		return this.usersService.update(id, userUpdate);
	}

	@Delete(':id') // DELETE /users/:id
	delete(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.delete(id);
	}
}

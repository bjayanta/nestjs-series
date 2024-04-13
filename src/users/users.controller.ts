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
import { UserRole } from './entities/user.entity';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get() // GET /users or /users?role=value&age=value
	async index(@Query('role') role?: UserRole) {
		return this.usersService.index(role);
	}

	@Get(':id') // GET /users/:id
	async show(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.show(id);
	}

	@Post() // POST /users
	async create(
		@Body(ValidationPipe)
		user: CreateUserDto,
	) {
		return this.usersService.create(user);
	}

	@Patch(':id') // PATCH /users/:id
	async update(
		@Param('id', ParseIntPipe) id: number,
		@Body(ValidationPipe)
		userUpdate: UpdateUserDto,
	) {
		return this.usersService.update(id, userUpdate);
	}

	@Delete(':id') // DELETE /users/:id
	async delete(@Param('id', ParseIntPipe) id: number) {
		return this.usersService.delete(id);
	}
}

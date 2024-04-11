import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get() // GET /users or /users?role=value&age=value
	index(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
		return this.usersService.index(role);
	}

	@Get(':id') // GET /users/:id
	show(@Param('id') id: string) {
		return this.usersService.show(+id);
	}

	@Post() // POST /users
	create(
		@Body()
		user: {
			name: string;
			email: string;
			role: 'INTERN' | 'ENGINEER' | 'ADMIN';
		},
	) {
		return this.usersService.create(user);
	}

	@Patch(':id') // PATCH /users/:id
	update(
		@Param('id') id: string,
		@Body()
		userUpdate: {
			name?: string;
			email?: string;
			role?: 'INTERN' | 'ENGINEER' | 'ADMIN';
		},
	) {
		return this.usersService.update(+id, userUpdate);
	}

	@Delete(':id') // DELETE /users/:id
	delete(@Param('id') id: string) {
		return this.usersService.delete(+id);
	}
}

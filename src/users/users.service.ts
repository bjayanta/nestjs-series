import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
	private users = [
		{
			id: 1,
			name: 'Leanne Graham',
			email: 'Sincere@april.biz',
			role: 'INTERN',
		},
		{
			id: 2,
			name: 'Ervin Howell',
			email: 'Shanna@melissa.tv',
			role: 'INTERN',
		},
		{
			id: 3,
			name: 'Clementine Bauch',
			email: 'Nathan@yesenia.net',
			role: 'ENGINEER',
		},
		{
			id: 4,
			name: 'Patricia Lebsack',
			email: 'Julianne.OConner@kory.org',
			role: 'ENGINEER',
		},
		{
			id: 5,
			name: 'Chelsey Dietrich',
			email: 'Lucio_Hettinger@annie.ca',
			role: 'ADMIN',
		},
	];

	constructor(
		@InjectRepository(User)
		private readonly usersRepository: Repository<User>,
		private readonly entityManager: EntityManager,
	) {}

	async index(role?: UserRole) {
		if (role) {
			const getRole = UserRole[role];

			if (!getRole) throw new NotFoundException('User role not found!');

			return this.usersRepository.find({
				where: { role },
			});
		}

		const users = this.usersRepository.find();

		return users;
	}

	async show(id: number) {
		const user = this.usersRepository.findOneByOrFail({ id });
		return user;
	}

	async create(user: CreateUserDto) {
		const newUser = new User(user);
		await this.entityManager.save(newUser);

		return newUser;
	}

	async update(id: number, updatedUser: UpdateUserDto) {
		await this.entityManager.update(User, id, updatedUser);
		return this.show(id);
	}

	async delete(id: number) {
		return this.usersRepository.delete(id);
	}
}

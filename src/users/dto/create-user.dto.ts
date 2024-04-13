import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
	@IsNotEmpty()
	@IsString()
	name: string;

	@IsEmail()
	email: string;

	@IsEnum(UserRole, { message: 'Valid role required!' })
	role: UserRole;
}

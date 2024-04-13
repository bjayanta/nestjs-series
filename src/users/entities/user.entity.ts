import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
	INTERN = 'INTERN',
	ENGINEER = 'ENGINEER',
	ADMIN = 'ADMIN',
}

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column({ length: 100, unique: true })
	email: string;

	@Column({ type: 'enum', enum: UserRole, nullable: true })
	role: UserRole;

	@Column('text', { nullable: true })
	bio: string;

	@Column('decimal', { precision: 15, scale: 2, default: 0 })
	amount: number;

	@Column({ default: true })
	public: boolean;

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	created_at: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	})
	updated_at: Date;

	constructor(user: Partial<User>) {
		Object.assign(this, user);
	}
}

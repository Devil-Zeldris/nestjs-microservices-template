import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('accounts')
export class AccountsEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ nullable: false })
  readonly username: string;

  @Column({ nullable: false })
  readonly email: string;

  @Column({ nullable: false })
  readonly hash: string;
}

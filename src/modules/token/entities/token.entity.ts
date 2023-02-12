import { User } from '@app/modules/user/entities/user.entity';
import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'tokens' })
export class Token extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  refresh_token: string;

  @OneToOne(() => User, (user) => user.token)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user!: User;
  @Column()
  user_id!: number;
}

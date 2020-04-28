import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { UserEntity } from 'src/user/user.entity';
import { type } from 'os';
import { CommentEntity } from 'src/comment/comment.entity';

@Entity('idea')
export class IdeaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column('text')
  idea: string;

  @Column('text')
  description: string;

  @ManyToOne(
    type => UserEntity,
    author => author.ideas,
  )
  author: UserEntity;

  @ManyToMany(type => UserEntity, { cascade: true })
  @JoinTable()
  upvotes: UserEntity[];

  @ManyToMany(type => UserEntity, { cascade: true })
  @JoinTable()
  downvotes: UserEntity[];

  @OneToMany(
    type => CommentEntity,
    commnet => commnet.idea,
    { cascade: true },
  )
  comments: CommentEntity[];
}

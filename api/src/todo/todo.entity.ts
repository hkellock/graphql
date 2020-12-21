import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column('boolean')
  completed: boolean;
}

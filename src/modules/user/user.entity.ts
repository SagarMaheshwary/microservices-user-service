import { Exclude, Transform } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  image: string;

  @Transform(({ value }) => value.toISOString())
  @Column()
  created_at: Date;

  @Transform(({ value }) => value?.toISOString())
  @Column()
  updated_at: Date;
}

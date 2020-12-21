import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TodoInput {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Boolean!)
  completed: boolean;
}

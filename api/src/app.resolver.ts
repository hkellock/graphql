import { Res } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';

@Resolver('App')
export class AppResolver {
  @Query(() => String)
  async hello(): Promise<string> {
    Logger.log('Hello GraphQL', 'app:resolver:hello');
    return 'world';
  }
}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      playground: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}

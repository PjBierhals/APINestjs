import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({})
export class MiddlewareModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

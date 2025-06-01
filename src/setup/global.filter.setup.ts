import { INestApplication } from '@nestjs/common';
import { HttpExceptionFilter } from '../exception.filter';

export const globalFilterSetup = (app: INestApplication) => {
  app.useGlobalFilters(new HttpExceptionFilter());
};
import { INestApplication } from '@nestjs/common';

export const GLOBAL_PREFIX = 'api';

export const globalPrefixSetup = (app: INestApplication) => {
  //специальный метод который ко всем маршрутам добавляет /api
  app.setGlobalPrefix(GLOBAL_PREFIX);
};

import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';

export function pipesSetup(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const errorForResponse: any = [];

        errors.forEach((error) => {
          const constraintsKeys = Object.keys(error.constraints);
          constraintsKeys.forEach((ckey) => {
            errorForResponse.push({
              message: error.constraints[ckey],
              field: error.property,
            });
          });
        });
        throw new BadRequestException(errorForResponse);
      },
    }),
  );
}

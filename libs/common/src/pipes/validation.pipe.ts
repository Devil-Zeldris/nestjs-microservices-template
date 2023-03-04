import {
  ArgumentMetadata,
  PipeTransform,
  UnprocessableEntityException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { MicroservicesErrors } from '@template/common';

export class ValidationPipe implements PipeTransform {
  async transform(
    value: any,
    metadata: ArgumentMetadata,
  ): Promise<string[] | string> {
    if (metadata.type === 'body' || metadata.type === 'query') {
      const obj = plainToClass(metadata.metatype, value);
      const errors = await validate(obj);
      const errorsArray: Array<string> = [];
      if (errors.length > 0) {
        errors.map((err) => {
          return errorsArray.push(
            `${err.property} - ${Object.values(err.constraints).join(', ')}`,
          );
        });
        throw new UnprocessableEntityException({
          error: 'Ошибка валидации',
          message: MicroservicesErrors.VALIDATION_ERROR,
          errors: errorsArray,
        });
      }
    }
    return value;
  }
}

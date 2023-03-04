import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { MicroservicesErrors } from '@template/common';

@Catch(HttpException)
export class RpcValidationFilter implements ExceptionFilter {
  catch(exception: HttpException): any {
    const exceptionResponse = exception.getResponse() as any;

    if (
      Array.isArray(exceptionResponse?.message) &&
      exceptionResponse?.statusCode === 400
    )
      return {
        statusCode: 400,
        message: MicroservicesErrors.VALIDATION_ERROR,
        error: exceptionResponse.message,
      };

    return exception.getResponse();
  }
}

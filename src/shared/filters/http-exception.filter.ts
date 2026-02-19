
import { Errors } from '@/shared/types/erorr.type'
import { Logger, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { ZodSerializationException } from 'nestjs-zod'
import { ZodError } from 'zod/v4'

@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name)

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    let status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    let message = 'Đã có lỗi xảy ra'
    let errors: Errors[] | undefined

    // Trường hợp ZodSerializationException (lỗi validation từ zod)
    if (exception instanceof ZodSerializationException) {
      const zodError = exception.getZodError()

      if (zodError instanceof ZodError) {
        this.logger.error(`ZodSerializationException: ${zodError.message}`)
      }

      status = HttpStatus.UNPROCESSABLE_ENTITY
      message = 'Dữ liệu không hợp lệ'
      errors = (zodError as any).errors.map((err) => ({
        field: err.path.join('.'),
        message: err.message,
      }))
    } else {
      // Trường hợp HttpException bình thường
      const res: any = exception.getResponse()
      status = exception.getStatus()

      if (typeof res === 'string') {
        message = res
      } else if (typeof res === 'object' && res !== null) {
        message = res.message || message
        if (res.errors) {
          errors = res.errors
        }
      }
    }

    const errorResponse = {
      statusCode: status,
      success: false,
      message,
      errors,
    }

    // // Ghi log
    // this.logger.error(`[${request.method}] ${request.url} → ${status} | ${message}`)

    response.status(status).json(errorResponse)
  }
}

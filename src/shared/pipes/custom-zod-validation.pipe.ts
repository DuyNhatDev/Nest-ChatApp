import { HttpStatus, UnprocessableEntityException } from '@nestjs/common'
import { createZodValidationPipe } from 'nestjs-zod'
import { ZodError } from 'zod'

export const CustomZodValidationPipe = createZodValidationPipe({
  createValidationException: (error: ZodError | any) => {
    const issues = error?.issues ?? []
    return new UnprocessableEntityException({
      success: false,
      statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      code: 'VALIDATION_FAILED',
      message: 'Validation failed',
      errors: issues.map((issue: any) => ({
        field: issue.path?.join('.') ?? '',
        message: issue.message,
      })),
    })
  },
})

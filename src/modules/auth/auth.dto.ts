import { SignInBodySchema, SignInResSchema, SignUpBodySchema, SignUpResSchema } from '@/modules/auth/auth.model';
import { createZodDto } from 'nestjs-zod'

export class SignUpBodyDTO extends createZodDto(SignUpBodySchema) {}
export class SignUpResDTO extends createZodDto(SignUpResSchema) {}

export class SignInBodyDTO extends createZodDto(SignInBodySchema) {}
export class SignInResDTO extends createZodDto(SignInResSchema) {}
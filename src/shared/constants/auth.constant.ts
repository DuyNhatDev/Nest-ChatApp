
export const TypeOfVerificationCode = {
  REGISTER: 'REGISTER',
  RESET_PASSWORD: 'RESET_PASSWORD',
} as const

export type TypeOfVerificationCodeType = (typeof TypeOfVerificationCode)[keyof typeof TypeOfVerificationCode]

export type AccessTokenPayloadCreate = {
  userId: string
  role: string
}

export type AccessTokenPayload = AccessTokenPayloadCreate & {
  exp: number
  iat: number
}

export type RefreshTokenPayloadCreate = {
  userId: string
  role: string
}

export type RefreshTokenPayload = RefreshTokenPayloadCreate & {
  exp: number
  iat: number
}

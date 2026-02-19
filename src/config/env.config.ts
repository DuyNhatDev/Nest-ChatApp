import { z } from 'zod'
import * as fs from 'fs'
import * as path from 'path'
import { config } from 'dotenv'
config({
  path: '.env',
  override: true,
  debug: false,
  quiet: true,
})

if (!fs.existsSync(path.resolve('.env'))) {
  console.log('Không tìm thấy file .env')
  process.exit(1)
}

const EnvConfigSchema = z.object({
  PORT: z.string(),
  CLIENT_URL: z.string(),
  DATABASE_URI: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
  ACCESS_TOKEN_SECRET: z.string(),
  REFRESH_TOKEN_SECRET: z.string(),
})

const envConfigServer = EnvConfigSchema.safeParse(process.env)
if (!envConfigServer.success) {
  console.log('Các giá trị khai báo trong file .env không hợp lệ')
  console.error(envConfigServer.error)
  process.exit(1)
}

const envConfig = envConfigServer.data
export default envConfig

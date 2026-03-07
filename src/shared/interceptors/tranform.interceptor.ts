import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface ApiResponse<T> {
  statusCode: number
  success: boolean
  message: string
  data?: T
  meta?: any
}

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE'

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
  private getDefaultMessage(method: HTTPMethod): string {
    switch (method) {
      case 'POST':
        return 'Tạo mới thành công'
      case 'PUT':
        return 'Cập nhật thành công'
      case 'DELETE':
        return 'Xóa thành công'
      case 'GET':
        return 'Lấy dữ liệu thành công'
      default:
        return 'Yêu cầu đã hoàn thành'
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse()
    const statusCode = response.statusCode

    return next.handle().pipe(
      map((res: any) => {
        const finalResponse: ApiResponse<T> = {
          statusCode,
          success: true,
          message: this.getDefaultMessage(request.method),
        }
        if (res && typeof res === 'object') {
          if ('message' in res) {
            finalResponse.message = res.message
            const { message, ...rest } = res
            res = Object.keys(rest).length > 0 ? rest : undefined
            finalResponse.data = res
          } else {
            finalResponse.data = res
          }
          if ('data' in res) {
            finalResponse.data = res.data
          }
          if ('meta' in res) {
            finalResponse.meta = res.meta
          }
        }
        return finalResponse
      }),
    )
  }
}

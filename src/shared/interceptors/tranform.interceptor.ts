import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface ApiResponse<T> {
  statusCode: number
  success: boolean
  message: string
  data: T
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
      map((data: any) => {
        if (data && typeof data === 'object' && 'success' in data && 'message' in data) {
          return data as ApiResponse<T>
        }

        let finalMessage = this.getDefaultMessage(request.method)
        if (data && typeof data === 'object' && 'message' in data) {
          finalMessage = data.message as string
          const { message, ...rest } = data
          data = Object.keys(rest).length > 0 ? rest : undefined
        }

        if (data && typeof data === 'object' && 'data' in data && 'meta' in data) {
          return {
            statusCode,
            success: true,
            message: finalMessage,
            data: data.data,
            meta: data.meta,
          }
        }

        if (data && typeof data === 'object' && 'data' in data) {
          data = data.data as T
        }

        return {
          statusCode,
          success: true,
          message: finalMessage,
          data,
        }
      }),
    )
  }
}

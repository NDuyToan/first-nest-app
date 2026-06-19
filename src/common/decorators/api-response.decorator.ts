import { ApiResponse } from '../interfaces/response.interface';

export function createApiResponse<T>(
  data: T,
  message?: string,
  status: 'success' | 'error' = 'success',
): ApiResponse<T> {
  return {
    status,
    data,
    message,
    timestamp: new Date().toISOString(),
  };
}

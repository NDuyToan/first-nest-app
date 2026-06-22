// src/filters/validation.filter.ts

import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';

import { Response } from 'express';

@Catch(BadRequestException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Format lại response cho validation errors
    const errors = Array.isArray((exceptionResponse as any).message)
      ? (exceptionResponse as any).message
      : [exception.message];

    response.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      errors: errors.map((error) => ({
        field: this.extractFieldFromError(error),
        message: error,
      })),
    });
  }

  private extractFieldFromError(error: string): string {
    // Logic để extract field name từ error message
    const match = error.match(/property (\w+) should not be empty/);
    return match ? match[1] : 'unknown';
  }
}

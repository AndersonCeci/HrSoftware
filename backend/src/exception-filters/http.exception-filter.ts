import { ArgumentsHost, ExceptionFilter, HttpException, Logger, Catch, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.error(
      `${req.method} ${req.originalUrl} ${status} error: ${exception.message}`,
    );

    const errorDetails = exception.getResponse();

    const customErrorMessage = this.getCustomErrorMessage(status, errorDetails);

    res.status(status).json({
      error: true,
      statusCode: status,
      message: customErrorMessage,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }

  private getCustomErrorMessage(status: number, errorDetails: any): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'Bad Request: Please check your input data.';
      case HttpStatus.UNAUTHORIZED:
        return 'Unauthorized: Authentication is required or has failed.';
      case HttpStatus.FORBIDDEN:
        return 'Forbidden: You do not have permission to access this resource.';
      case HttpStatus.NOT_FOUND:
        return 'Not Found: The requested resource could not be found.';
      case HttpStatus.CONFLICT:
        return 'Conflict: The request could not be completed due to a conflict with the current state of the target resource.';
      case HttpStatus.INTERNAL_SERVER_ERROR:
        return 'Internal Server Error: An unexpected error occurred on the server.';
      case HttpStatus.GATEWAY_TIMEOUT:
        return 'Gateway Timeout: The server took too long to respond.';
      case HttpStatus.SERVICE_UNAVAILABLE:
        return 'Service Unavailable: The server is currently unable to handle the request.';
      case HttpStatus.BAD_GATEWAY:
        return 'Bad Gateway: The server received an invalid response from the upstream server.';
      case HttpStatus.REQUEST_TIMEOUT:
        return 'Request Timeout: The server timed out waiting for the request.';
      default:
        return typeof errorDetails === 'string' ? errorDetails : 'An unexpected error occurred.';
    }
  }
}

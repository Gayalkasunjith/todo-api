import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty()
  message: string;
  @ApiProperty()
  error: string;
  @ApiProperty()
  statusCode: number;

  init(message: string, error: string, statusCode: number) {
    this.message = message;
    this.error = error;
    this.statusCode = statusCode;
  }
}

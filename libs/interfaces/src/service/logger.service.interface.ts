export interface ILoggerService {
  log(message: string): void;
  debug(message: string): void;
  warn(message: string): void;
  info(message: string): void;
  error(message: string, ...meta: any[]): void;
}

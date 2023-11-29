import { LogLevel, LoggerEnum } from './logger.enum';

export interface ILoggerOptions {
  engine: LoggerEnum;
  service: string;
  level: LogLevel;
}

export interface ILogLevelOptions {
  level: LogLevel;
  service?: string;
}

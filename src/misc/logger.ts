import { createLogger, transports, format } from "winston";

const logFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} | [${level}] | ${stack || message}`;
});

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:MM:SS " }),
    logFormat
  ),
  transports: [new transports.Console()],
});

export default logger;

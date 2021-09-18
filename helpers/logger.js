const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const myFormat = printf(({ level, message,  timestamp }) => {
  return `${timestamp} [${level}]: ${JSON.stringify(message)}`;
});
let logger = null;
logger = () => {
    return createLogger({
        level: 'error',         
        format: combine(
          timestamp({format:"HH:mm:ss"}),
          myFormat
        ),
        transports: [
          new transports.File({ filename: 'error.log'}),
        ],
    });
}
module.exports = logger;
/* eslint-disable no-console */
class CLogger {
  constructor() {
    if (process.env.NODE_ENV !== "production") {
      this.log = console.log.bind(console);
      this.warn = console.warn.bind(console);
      this.error = console.error.bind(console);
    }
  }
}
const Logger = new CLogger();
module.exports = Logger;

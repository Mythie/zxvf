export interface Logger {
  log(..._args: any[]): void;
  warn(..._args: any[]): void;
  error(..._args: any[]): void;
  fatal(..._args: any[]): void;
}

export const useLogger = (): Logger => {
  return {
    log: (...args: any[]) => console.log(...args),
    warn: (...args: any[]) => console.warn(...args),
    error: (...args: any[]) => console.error(...args),
    fatal: (...args: any[]) => console.error(...args),
  };
};


// FACTORY CLASS, do not use
// from https://stackoverflow.com/questions/31089801/extending-error-in-javascript-with-es6-syntax-babel
class ExtendableError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name;
      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(this, this.constructor);
      } else { 
        this.stack = (new Error(message)).stack; 
      }
    }
  }    
  

/**
 * Use to define legal inputs for functions
 */
export class IllegalArgumentError extends ExtendableError {
  constructor(message) {
    super(message);
    this.name = "IllegalArgumentError";
  }
}

/**
 * Use to mark unreacheable clause
 */
export class RuntimeError extends Error {
  constructor(message) {
    super(message);
    this.name = "RuntimeError";
  }
}


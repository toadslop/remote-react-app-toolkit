export class ElementError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ElementError";
  }
}

export class MissingPropertyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MissingPropertyError";
  }
}

/**
 * Error used to indicate when a required property was not
 * received from the Liferay instance.
 *
 * @extends {Error}
 */
export class MissingPropertyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MissingPropertyError";
  }
}

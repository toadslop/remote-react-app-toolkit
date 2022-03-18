import { ElementError } from "./errors";

const { NODE_ENV } = process.env;

export const getAppRootElement = (elementId: string) => {
  const root = document.getElementsByTagName(elementId);

  if (root.length === 0)
    throw new ElementError(
      `Liferay React Provider was provided elementId "${elementId}" but could not find such an element.`
    );
  if (root.length > 1)
    throw new ElementError(
      `The element ID should be unique but multiple elements with elementID "${elementId}" were found.`
    );

  return root[0];
};

/**
 * Takes a URL as an input and returns everything up to /-/, which is Liferay's
 * equivalent of the hash from React Router Dom's hash router.
 * Used for handling routing.
 *
 * @param  pathname  an absolute URL giving the base location of the image
 * @return  The URL up to /-/ and nothing more.
 */
export const getBaseUrl = (pathname: string) => {
  const subdashIndex =
    pathname.indexOf("/-") === -1 ? pathname.length : pathname.indexOf("/-");
  return `${pathname.substring(0, subdashIndex)}/-/`;
};

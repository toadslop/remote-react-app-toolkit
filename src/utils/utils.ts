import { REMOTE_APP_PORTLET_KEY } from "./constants";
import { Properties } from "./interfaces";

/**
 * Used to get the HTML element in which your Remote App will be injected.
 *
 * @param  elementId The HTML Element Name defined in which the app is generated.
 * @return  The DOM element matching the HTML Element Name
 */
export const getAppRootElement = (elementId: string): Element =>
  document.getElementsByTagName(elementId)[0];

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

/**
 * Used to extract the custom properties that Liferay passed to the application
 * from the Element in which the app is injected.
 *
 * @param  rootElement The root element of the application,
 * into which your Remote App should have been injected.
 *
 * @return An object containing key-value pairs for the properties.
 * Kebab case property names will be converted to camelCase.
 */
export const getAppProperties = (rootElement: Element) =>
  rootElement.getAttributeNames().reduce(toAttrObj(rootElement), {});

/**
 * Checks if the list of props extracted from the root app element match the those required.
 *
 * @param  requiredProperties An array of the names of the properties. These are expected
 * to be the properties that this remote app requires to be passed from Liferay in order
 * for it to function properly.
 *
 * @param  presentProperties An array of the names of the properties. These should be
 * the properties that were actually extracted from the DOM.
 *
 * @return An array of property names that were not found in the presentProperties parameter.
 */
export const findMissingProps = (
  requiredProperties: string[],
  presentProperties: Properties
) =>
  requiredProperties.map(kebabToCamel).reduce((arr: string[], prop) => {
    if (!(prop in presentProperties)) arr.push(prop);
    return arr;
  }, []);

/**
 * Extracts the Portlet Id of this remote app from the DOM. Note that the Portlet Id
 * refers to the ID of the portlet element in the DOM, not the ID of the app in
 * the lportal database.
 *
 * @param  rootElement The root element of the application,
 * into which your Remote App should have been injected.
 *
 * @return The value of the id attribute that hosts the portlet. Note that this is
 * further of the DOM tree from the element where the app is actually injected.
 */
export const getPortletId = (rootElement: Element) => {
  let node: Element | null = rootElement;

  while (
    node &&
    node?.nodeName !== "SECTION" &&
    !node.classList.contains("portlet")
  )
    node = node?.parentElement;

  return node?.getAttribute("id") || "";
};

/**
 * Extracts remoteAppEntryId from the portletId. This id is the one actually used
 * in the lportal database, so it's useful for extracting additional metadata
 * about the application using Liferay's JSON Web Services or Headless APIs.
 *
 * @param  portletId The id of the DOM element that hosts the portlet.
 *
 * @return The remoteAppEntryId of the application.
 */
export const getRemoteAppEntryId = (portletId: string) =>
  portletId.replace(`${REMOTE_APP_PORTLET_KEY}_`, "");

const toAttrObj =
  (rootElement: Element) => (attrObj: Properties, attrName: string) => {
    const attrValue = rootElement.getAttribute(attrName);

    if (attrValue) attrObj[kebabToCamel(attrName)] = attrValue;
    return attrObj;
  };

const kebabToCamel = (kebabString: string) =>
  kebabString
    .split("-")
    .map((word, i) =>
      i >= 1 ? word[0].toUpperCase() + word.substring(1, word.length) : word
    )
    .join("");

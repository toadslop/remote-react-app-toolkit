import { REMOTE_APP_PORTLET_KEY } from "./constants";

export const getAppRootElement = (elementId: string) =>
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

export interface Attributes {
  [key: string]: string;
}

export const getAppProperties = (rootElement: Element) =>
  rootElement.getAttributeNames().reduce(toAttrObj(rootElement), {});

const toAttrObj =
  (rootElement: Element) => (attrObj: Attributes, attrName: string) => {
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

export const findMissingProps = (
  requiredProperties: string[],
  presentProperties: Attributes
) =>
  requiredProperties.reduce((arr: string[], prop) => {
    if (!(prop in presentProperties)) arr.push(prop);
    return arr;
  }, []);

export const getPortletId = (rootNode: Element) => {
  let node: Element | null = rootNode;

  while (
    node &&
    node?.nodeName !== "SECTION" &&
    !node.classList.contains("portlet")
  ) {
    node = node?.parentElement;
  }

  return node?.getAttribute("id") || "";
};

export const getRemoteAppEntryId = (portletId: string) =>
  portletId.replace(`${REMOTE_APP_PORTLET_KEY}_`, "");

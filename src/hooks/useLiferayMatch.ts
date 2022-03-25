import { useLocation, useMatch } from "react-router-dom";
import { getBaseUrl, MissingPropertyError } from "../utils";
import useLiferayContext from "./useLiferayContext";

/**
 * A wrapper for React Router DOM's useMatch. This allows you to match only
 * URLs that are relevant to your portlet and won't interfere with other
 * portlets on the page. However, it can only manage this is a friendly
 * url mapping has been set and passed to the application as a property.
 *
 * Note: you do not need to include the friendly url mapping as part of the path
 * parameter.
 *
 * @throws {MissingPropertyError}
 */
const useLiferayMatch = (path: string) => {
  const { pathname } = useLocation();
  const { properties } = useLiferayContext();
  const { friendlyUrlMapping } = properties;

  if (!friendlyUrlMapping)
    throw new MissingPropertyError(
      "Property friendly-url-mapping not provided"
    );

  const base = getBaseUrl(pathname);
  return useMatch(`${base}${friendlyUrlMapping}${path}`);
};

export default useLiferayMatch;

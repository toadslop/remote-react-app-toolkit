import { NavigateOptions, useLocation, useNavigate } from "react-router-dom";
import { getBaseUrl, MissingPropertyError } from "../utils";
import useLiferayContext from "./useLiferayContext";

/**
 * A wrapper for React Router DOM's useNavigate. This allows manipulation of the URL
 * without interfering with other portlets on the page. Note that this hook
 * requires that a friendly url mapping be set and also passed in as a property.
 *
 * Note: you do not need to include the friendly url mapping as part of the path
 * parameter.
 *
 * @returns A wrapper function over useNavigate's standard output. It accepts the
 * same parameters as the original.
 *
 * @throws {MissingPropertyError}
 */
const useLiferayNavigate = () => {
  const { pathname } = useLocation();
  const { properties } = useLiferayContext();
  const { friendlyUrlMapping } = properties;

  if (!friendlyUrlMapping)
    throw new MissingPropertyError(
      "Property friendly-url-mapping not provided"
    );

  const navigate = useNavigate();
  return (path: string, options?: NavigateOptions) => {
    const base = getBaseUrl(pathname);
    navigate(`${base}${friendlyUrlMapping}${path}`, options);
  };
};

export default useLiferayNavigate;

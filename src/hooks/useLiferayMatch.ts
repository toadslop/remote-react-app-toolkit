import { useLocation, useMatch } from "react-router-dom";
import { getBaseUrl, MissingPropertyError } from "../utils";
import useLiferayContext from "./useLiferayContext";

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

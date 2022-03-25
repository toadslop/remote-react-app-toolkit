import { NavigateOptions, useLocation, useNavigate } from "react-router-dom";
import { getBaseUrl, MissingPropertyError } from "../utils";
import useLiferayContext from "./useLiferayContext";

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

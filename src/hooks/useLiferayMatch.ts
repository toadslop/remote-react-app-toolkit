import { useLocation, useMatch } from "react-router-dom";
import { getBaseUrl } from "../utils";

export const useLiferayMatch = (path: string) => {
  const { pathname } = useLocation();
  const base = getBaseUrl(pathname);
  return useMatch(`${base}${path}`);
};

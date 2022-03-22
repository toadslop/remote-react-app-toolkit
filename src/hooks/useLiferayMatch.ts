import { useLocation, useMatch } from "react-router-dom";
import { getBaseUrl } from "../utils";

const useLiferayMatch = (path: string) => {
  const { pathname } = useLocation();
  const base = getBaseUrl(pathname);
  return useMatch(`${base}${path}`);
};

export default useLiferayMatch;

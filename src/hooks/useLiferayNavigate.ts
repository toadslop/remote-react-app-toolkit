import { NavigateOptions, useLocation, useNavigate } from "react-router-dom";
import { getBaseUrl } from "../utils";

export function useLiferayNavigate() {
  const { pathname } = useLocation();
  const _navigate = useNavigate();

  return (path: string, options?: NavigateOptions) => {
    const base = getBaseUrl(pathname);
    const url = new URL(path, base);
    _navigate(url.pathname, options);
  };
}

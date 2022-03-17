import { useLocation, useNavigate } from "react-router-dom";
import { getBaseUrl } from "../utils";

export function useLiferayNavigate() {
  const { pathname } = useLocation();
  const _navigate = useNavigate();

  return (url: string) => {
    const base = getBaseUrl(pathname);

    _navigate(`${base}${url}`, {
      replace: true,
    });
  };
}

import { NavigateOptions, useLocation, useNavigate } from "react-router-dom";
import { getBaseUrl } from "../utils";

const useLiferayNavigate = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (path: string, options?: NavigateOptions) => {
    const base = getBaseUrl(pathname);
    navigate(`${base}${path}`, options);
  };
};

export default useLiferayNavigate;

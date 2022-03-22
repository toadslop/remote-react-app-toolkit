import { useContext } from "react";
import RemoteAppContext from "../components/LiferayContext";

const useLiferayContext = () => {
  return useContext(RemoteAppContext);
};

export default useLiferayContext;

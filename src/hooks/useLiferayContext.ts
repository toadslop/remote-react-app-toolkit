import { useContext } from "react";
import RemoteAppContext from "../components/LiferayContext";

/**
 * Provides access to metadata about the remote app.
 *
 * From this you can access the following:
 * - the webdavurl
 * - the portletId
 * - the remoteAppEntryId
 * - all of the properties passed in from the Remote App Admin Portlet
 *
 * @returns a context object
 */
const useLiferayContext = () => {
  return useContext(RemoteAppContext);
};

export default useLiferayContext;

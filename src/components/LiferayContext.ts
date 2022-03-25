import React, { createContext } from "react";
import { Properties } from "../utils/interfaces";

export interface AppContext {
  portletId: string;
  remoteAppEntryId: string;
  properties: Properties;
  elementId: string;
}

export const defaultRemoteAppContext: AppContext = {
  portletId: "",
  remoteAppEntryId: "",
  properties: {},
  elementId: "",
};

const RemoteAppContext = createContext(defaultRemoteAppContext);
export default RemoteAppContext;

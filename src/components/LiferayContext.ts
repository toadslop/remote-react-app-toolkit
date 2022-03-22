import React, { createContext } from "react";
import { Attributes } from "../utils";

export interface AppContext {
  portletId: string;
  remoteAppEntryId: string;
  properties: Attributes;
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

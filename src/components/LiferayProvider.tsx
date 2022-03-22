import React, { ReactNode, useEffect, useState, VFC } from "react";
import { BrowserRouter } from "react-router-dom";
import { getAppRootElement } from "../utils";
import { Attributes, findMissingProps, getAppProperties, getPortletId, getRemoteAppEntryId } from "../utils/utils";
import RemoteAppContext, { AppContext, defaultRemoteAppContext } from "./LiferayContext";
import MissingProps from "./MissingProps";

type Props = {
    children: ReactNode;
    elementId: string;
    requiredProperties?: string[];
};

const LiferayProvider: VFC<Props> = (props) => {
    const { elementId, children, requiredProperties = [] } = props;
    const [context, setContext] = useState<AppContext>(defaultRemoteAppContext);
    const [missingProps, setMissingProps] = useState<string[]>([]);

    useEffect(() => {
        const rootElement = getAppRootElement(elementId);
        const properties = getAppProperties(rootElement);
        console.log(properties)
        console.log(requiredProperties)
        if (requiredProperties) setMissingProps(findMissingProps(requiredProperties, properties));
        const portletId = getPortletId(rootElement);
        const remoteAppEntryId = getRemoteAppEntryId(portletId);
        setContext({ portletId, remoteAppEntryId, properties, elementId });

    }, []);

    return missingProps.length > 0 ?
        <MissingProps requiredProperties={requiredProperties} missingProps={missingProps} />
        : <RemoteAppContext.Provider value={context}><BrowserRouter>{children}</BrowserRouter></RemoteAppContext.Provider>;
};

export default LiferayProvider;

import React, { ReactNode, useEffect, useState, VFC } from "react";
import { BrowserRouter } from "react-router-dom";
import { getAppRootElement } from "../utils";
import { Attributes, findMissingProps, getAppProperties, getPortletId, getRemoteAppEntryId } from "../utils/utils";
import MissingProps from "./MissingProps";

type Props = {
    children: ReactNode;
    elementId: string;
    requiredProperties?: string[];
};

const LiferayProvider: VFC<Props> = (props) => {
    const { elementId, children, requiredProperties = [] } = props;
    const [properties, setProperties] = useState<Attributes>();
    const [missingProps, setMissingProps] = useState<string[]>([]);
    const [portletId, setPortletId] = useState<string>("");
    const [remoteAppEntryId, setRemoteAppEntryId] = useState<string>("");

    useEffect(() => {
        const rootElement = getAppRootElement(elementId);
        const appProperties = getAppProperties(rootElement);
        if (requiredProperties) setMissingProps(findMissingProps(requiredProperties, appProperties));
        const id = getPortletId(rootElement);
        const entryId = getRemoteAppEntryId(id);
        setProperties(appProperties);
        setPortletId(id);
        setRemoteAppEntryId(entryId);
        console.log(id, entryId)
    }, [elementId, requiredProperties, setMissingProps, setProperties, setPortletId, setRemoteAppEntryId])

    return missingProps.length > 0 ?
        <MissingProps requiredProperties={requiredProperties} missingProps={missingProps} />
        : <BrowserRouter>{children}</BrowserRouter>;
};

export default LiferayProvider;

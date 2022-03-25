import React, { ReactNode, useEffect, useState, VFC } from "react";
import { BrowserRouter } from "react-router-dom";
import { getAppRootElement } from "../utils";
import {
    findMissingProps,
    getAppProperties,
    getPortletId,
    getRemoteAppEntryId,
} from "../utils/utils";
import RemoteAppContext, {
    AppContext,
    defaultRemoteAppContext,
} from "./LiferayContext";
import MissingProps from "./MissingProps";

type Props = {
    children: ReactNode;
    elementId: string;
    requiredProperties?: string[];
    displayMissingPropsUi?: boolean;
};

/**
 * Provider component which extracts useful metadata about the remote app and
 * makes it available as a Context via the useLiferayContext hook.
 *  
 * @property {children} Typically the root compoent of your remote app.
 * @property {elementId} The HTML element name of the application.
 * @property {requiredProperties} An array of the names of the properties that this app requires.
 * Note that this is simply so that the application will provide warnings if it doesn't
 * receive the properties it needs from Liferay. It does not otherwise effect the functioning of the app.
 * @property {displayMissingPropsUi} If set to true, will display an error message in the UI if
 * any of the required properties were not received from the host Liferay instance.
 * 
 * @component
 * @example
 *   <LiferayProvider requiredProperties={["style-picklist-id", "folderId", "repoId"]} elementId="my-app">
 *     <MyPortletComponent />
 *   </LiferayProvider>
 */
const LiferayProvider: VFC<Props> = (props) => {
    const { elementId, children, requiredProperties, displayMissingPropsUi } =
        props;
    const [context, setContext] = useState<AppContext>(defaultRemoteAppContext);
    const [missingProps, setMissingProps] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const rootElement = getAppRootElement(elementId);
        const properties = getAppProperties(rootElement);
        if (requiredProperties)
            setMissingProps(findMissingProps(requiredProperties, properties));
        const portletId = getPortletId(rootElement);
        const remoteAppEntryId = getRemoteAppEntryId(portletId);
        setContext({ portletId, remoteAppEntryId, properties, elementId });
        setLoading(false);
    }, []);

    if (loading) return <></>;
    if (displayMissingPropsUi && missingProps.length > 0)
        return (
            <MissingProps
                requiredProperties={requiredProperties || []}
                missingProps={missingProps}
            />
        );

    missingProps.forEach((prop) =>
        console.warn(
            `${prop} is marked as required but was not passed in from the Remote App Admin Portlet`
        )
    );

    return (
        <RemoteAppContext.Provider value={context}>
            <BrowserRouter>{children}</BrowserRouter>
        </RemoteAppContext.Provider>
    );
};

export default LiferayProvider;

import React, { ReactNode, useState, VFC } from 'react'
import { getAppRootElement } from '../utils';

type Props = {
    children: ReactNode;
    elementId: string;
}

const LiferayProvider: VFC<Props> = (props) => {
    const { elementId, children } = props;
    const [rootElement, setRootElement] = useState<Element>(getAppRootElement(elementId));

    return (
        <>{children}</>
    )
}

export default LiferayProvider
import React, { ReactNode, useRef, useState, VFC } from 'react'
import { getAppRootElement } from '../utils';

type Props = {
    children: ReactNode;
    elementId: string;
}

const LiferayProvider: VFC<Props> = (props) => {
    const { elementId, children } = props;
    const [rootElement, setRootElement] = useState<Element>(getAppRootElement(elementId));
    const nodeRef = useRef(null);

    return (
        <div ref={nodeRef}>{children}</div>
    )
}

export default LiferayProvider
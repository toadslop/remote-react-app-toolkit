import React, { ReactNode, useRef, useState, VFC } from 'react'
import { getAppRootElement } from '../utils';

type Props = {
    children: ReactNode;
    elementId: string;
}

const LiferayProvider: VFC<Props> = (props) => {
    const { elementId, children } = props;
    const [root, setRoot] = useState<Element>();
    const nodeRef = useRef(null);
    setRoot(getAppRootElement(elementId));

    return (
        <div ref={nodeRef}>{children}</div>
    )
}

export default LiferayProvider
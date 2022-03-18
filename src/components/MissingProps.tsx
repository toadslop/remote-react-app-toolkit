import React from 'react'

type Props = {
    requiredProperties: string[];
    missingProps: string[];
}

const MissingProps = (props: Props) => {
    const { requiredProperties, missingProps } = props;
    return (
        <>
            <h2>Error!</h2>
            <p>This remote app requires the following parameters to function properly:</p>
            <ul>
                {requiredProperties?.map((param, index) =>
                    <li key={index}>{param}</li>
                )}
            </ul>
            <p>However, only the following is missing:</p>
            <ul>
                {missingProps.map((param, index) =>
                    <li style={{ color: "red" }} key={index}>{param}</li>
                )}
            </ul>
            <p>Please navigate to the remote app's configuration and enter the necessary values.</p>
        </>
    )
}

export default MissingProps
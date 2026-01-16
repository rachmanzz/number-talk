import type { ReactElement } from "react";

export default function ShowElement ({show, children}: {children: ReactElement, show: boolean}) {

    return (
        <>
            {show && children }
        </>
    )
}


import type { SVGProps } from "react";

export default function DivIcon({...props}: SVGProps<SVGSVGElement>) {

    return (
        <svg
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect
                width={9}
                height={42}
                rx={2}
                transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 40.5312 10.364)"
                fill="currentColor"
            />
        </svg>
    )
}
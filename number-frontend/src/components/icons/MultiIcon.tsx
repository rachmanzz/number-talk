import type { SVGProps } from "react";

export default function MultiIcon({ ...props }: SVGProps<SVGSVGElement>) {

    return (
        <svg
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect
                x={4.0625}
                y={10.364}
                width={9}
                height={42}
                rx={2}
                transform="rotate(-45 4.0625 10.364)"
                fill="currentColor"
            />
            <rect
                width={9}
                height={42}
                rx={2}
                transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 40.0625 10.364)"
                fill="currentColor"
            />
        </svg>
    )
}
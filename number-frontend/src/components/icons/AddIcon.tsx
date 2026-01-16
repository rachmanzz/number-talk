import type { SVGProps } from "react";

export default function AddIcon({ ...props }: SVGProps<SVGSVGElement>) {

    return (
        <svg
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect x={19} y={2} width={9} height={42} rx={2} fill="currentColor" />
            <rect
                x={2}
                y={28}
                width={9}
                height={42}
                rx={2}
                transform="rotate(-90 2 28)"
                fill="currentColor"
            />
        </svg>
    )
}
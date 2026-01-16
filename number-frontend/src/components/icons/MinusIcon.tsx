import type { SVGProps } from "react";

export default function MinusIcon({ ...props }: SVGProps<SVGSVGElement>) {

    return (
        <svg
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect
                x={6}
                y={27}
                width={9}
                height={34}
                rx={2}
                transform="rotate(-90 6 27)"
                fill="currentColor"
            />
        </svg>
    )
}
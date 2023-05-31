import * as React from "react"
import {SVGProps} from "react"

const ArrowLeft = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        {...props}
    >
        <path
            stroke="#232727"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m13 16-4-4 4-4"
        />
    </svg>
)
export default ArrowLeft
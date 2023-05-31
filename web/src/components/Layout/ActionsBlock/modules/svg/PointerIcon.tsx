import * as React from 'react'
import {SVGProps} from 'react'

const PointerIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={38}
    height={38}
    fill="none"
    {...props}
  >
    <rect width={38} height={38} fill="#F6F6FA" rx={10} />
    <path
      stroke="#828EA4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.25 25H25m-12.75 0v-3.272l8.66-8.891c.317-.324.474-.486.656-.547a.778.778 0 0 1 .493 0c.182.06.34.223.655.547l1.384 1.42c.316.325.474.487.533.674a.839.839 0 0 1 0 .505c-.06.187-.217.349-.533.673L15.438 25H12.25Z"
    />
  </svg>
)
export default PointerIcon
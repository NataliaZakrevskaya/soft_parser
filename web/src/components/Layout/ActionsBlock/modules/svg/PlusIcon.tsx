import * as React from 'react'
import {SVGProps} from 'react'

const PlusIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <circle
      cx={7.999}
      cy={7.999}
      r={5.917}
      stroke="#232727"
      strokeWidth={1.5}
    />
    <path
      stroke="#232727"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M5.332 7.999h5.333M8 5.332v5.333"
    />
  </svg>
)
export default PlusIcon
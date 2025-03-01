'use client'
import * as React from 'react'

const GrowthGraphIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="3" x2="3" y2="21" />
    <line x1="3" y1="21" x2="21" y2="21" />
    <polyline points="3 17 9 11 13 15 21 7" />
    <polyline points="16 7 21 7 21 12" />
  </svg>
)

export default GrowthGraphIcon

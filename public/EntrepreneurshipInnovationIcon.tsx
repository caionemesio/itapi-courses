'use client'
import * as React from 'react'

const EntrepreneurshipInnovationIcon: React.FC<
  React.SVGProps<SVGSVGElement>
> = (props) => (
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
    {/* Engrenagem (sem círculo central) */}
    <path d="M12 2v2M12 20v2M20 12h2M2 12H4M17.66 6.34l1.42-1.42M4.92 19.08l1.42-1.42M6.34 6.34 4.92 4.92M19.08 19.08l-1.42-1.42" />

    {/* Lâmpada (inovação) */}
    <path d="M9 9a3 3 0 0 1 6 0c0 1.12-.61 2.09-1.5 2.61V14h-3v-2.39C9.61 11.09 9 10.12 9 9Z" />
    <path d="M10 14h4v2c0 .55-.45 1-1 1h-2c-.55 0-1-.45-1-1v-2Z" />
  </svg>
)

export default EntrepreneurshipInnovationIcon

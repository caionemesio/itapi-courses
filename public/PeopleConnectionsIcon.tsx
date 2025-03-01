'use client'
import * as React from 'react'

const PeopleConnectionsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
) => (
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
    {/* Pessoa 1 */}
    <circle cx="5" cy="5" r="3" />
    {/* Pessoa 2 */}
    <circle cx="19" cy="5" r="3" />
    {/* Pessoa 3 */}
    <circle cx="5" cy="19" r="3" />
    {/* Pessoa 4 */}
    <circle cx="19" cy="19" r="3" />

    {/* Ligações entre as pessoas */}
    <line x1="5" y1="5" x2="19" y2="5" />
    <line x1="5" y1="5" x2="5" y2="19" />
    <line x1="19" y1="5" x2="19" y2="19" />
    <line x1="5" y1="19" x2="19" y2="19" />
  </svg>
)

export default PeopleConnectionsIcon

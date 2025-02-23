// components/Input.tsx
import * as React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export interface InputProps extends React.ComponentProps<'input'> {
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
  /** Se definido, o ícone da esquerda será clicável e redirecionará para a URL informada */
  iconLeftLinkUrl?: string
  /** Se definido, o ícone da direita será clicável e redirecionará para a URL informada */
  iconRightLinkUrl?: string
  containerClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      type,
      iconLeft,
      iconRight,
      iconLeftLinkUrl,
      iconRightLinkUrl,
      ...props
    },
    ref,
  ) => {
    // Ajusta os paddings conforme a existência dos ícones
    const paddingClasses = cn(
      iconLeft ? 'pl-10' : 'pl-3',
      iconRight ? 'pr-10' : 'pr-3',
    )

    return (
      <div className={cn('relative', containerClassName)}>
        {iconLeft && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            {iconLeftLinkUrl ? (
              <Link href={iconLeftLinkUrl}>{iconLeft}</Link>
            ) : (
              iconLeft
            )}
          </div>
        )}
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm py-1',
            paddingClasses,
            className,
          )}
          ref={ref}
          {...props}
        />
        {iconRight && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {iconRightLinkUrl ? (
              <Link href={iconRightLinkUrl}>{iconRight}</Link>
            ) : (
              iconRight
            )}
          </div>
        )}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }

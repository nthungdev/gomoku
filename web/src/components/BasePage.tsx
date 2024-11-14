import classNames from 'classnames'
import { ComponentProps } from 'react'

export default function BasePage({
  children,
  className,
}: ComponentProps<'div'>) {
  return (
    <div
      className={classNames(
        'flex-1 w-full max-w-screen-lg mx-auto py-4 px-2',
        className
      )}
    >
      {children}
    </div>
  )
}

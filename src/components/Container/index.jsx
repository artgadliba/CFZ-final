import clsx from 'clsx';

import style from './styles.module.scss'

export const Container = ({ className, children, fluid }) => {
  return (
    <div className={clsx(style.container, fluid ? style.fluid : '', className)}>
      {children}
    </div>
  )
}
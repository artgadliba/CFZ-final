import clsx from 'clsx';

import style from './styles.module.scss'

export const ButtonDefault = ({ children, onClick, className }) => {

  return (
    <button className={clsx(style.btn, className)} onClick={onClick}>
      {children}
    </button>
  )
}

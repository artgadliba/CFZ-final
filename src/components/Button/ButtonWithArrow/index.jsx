import clsx from 'clsx';

import { Icon } from 'components/Icon';

import style from './styles.module.scss'

export const ButtonWithArrow = ({ onClick, className }) => {


  return (
    <div onClick={onClick} className={clsx(style.container, className)}>
      <button  className={style.btn} >
        <Icon.Arrow/>
      </button>
    </div>
  )
}

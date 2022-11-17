import clsx from 'clsx';

import { Icon } from 'components/Icon';
import { SOCIAL } from 'constants/social';

import style from './styles.module.scss'

export const Social = ({ withGradient = false }) => {
  return (
    <div className={style.social}>
      {SOCIAL.map(({ id, path, icon }) => {
        const filteredIcon = !withGradient ? icon.replace('ShipGradient', 'Ship') : icon
        const SocialIcon = Icon[filteredIcon]
        return (
          <a
            className={clsx(style.item, { [style.gradient]: withGradient })}
            style={{borderColor: withGradient ?  '#ec68c2' : ''}}
            key={id}
            href={path}
            target="_blank"
            rel="noreferrer noopener"
          >
            <SocialIcon withGradient={withGradient}/>
          </a>
        )
      })}
    </div>
  )
}
import ReactDOM from 'react-dom'
import { forwardRef, useRef } from 'react';

import useClickOutside from 'hooks/useClickOutside';

import style from './styles.module.scss'

import { SLIDER_CARDS } from 'constants/slider_cards';

export const VideoModal = ({ id, setOpenedVideo }) => {
  const ref = useRef(null)

  const handleClickOutside = () => {
    setOpenedVideo(null)
  }

  const filteredVideo = SLIDER_CARDS.filter((video) => id === video.id)

  useClickOutside(ref, handleClickOutside)

  return ReactDOM.createPortal(
    <>
      <div className={style.container}>
        <div className={style.modal}>
          <video width="750" height="500" autoPlay>
            <source src={filteredVideo[0].video} type="video/mp4"/>
          </video>
        </div>
        <div className={style.overlay} ref={ref} onClick={handleClickOutside}/>
      </div>
    </>, document.querySelector('#root'))
}
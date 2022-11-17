import style from './styles.module.scss'
import clsx from "clsx";
import React from "react";

export const Card = ({ title, text, cloud1, cloud2 }) => {

  return (
    <div className={style.card}>
        <picture>
            <source type="image/webp" srcSet={cloud1.webp}/>
            <img className={clsx(style.imageCloud, style.left)} src={cloud1.png} alt=""/>
        </picture>
        <picture>
            <source type="image/webp" srcSet={cloud2.webp}/>
            <img className={clsx(style.imageCloud, style.right)} src={cloud2.png} alt=""/>
        </picture>
      <div className={style.title}>
        <p>
          {title}
        </p>
      </div>
      <div className={style.text}>
        <p>
          {text}
        </p>
      </div>
    </div>
  )
}
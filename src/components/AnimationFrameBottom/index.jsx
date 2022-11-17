import style from './styles.module.scss'
import useWindowSize from '../../hooks/useWindowSize'
import React from "react";
import cloudBottom from "../../assets/img/new/cloud_bottom_top.png"
import cloudBottomWebp from "../../assets/img/new/cloud_bottom_top.webp"

export const AnimationFrameBottom = () => {
    const {width} = useWindowSize()
    return (
        <>
            <div className={style.container}>
                <div className={style.wrapper}>
                    {width > 768 &&
                        <>
                            <picture>
                                <source srcSet={cloudBottomWebp}/>
                                <img src={cloudBottom} alt='clouds_bottom'/>
                            </picture>
                            <picture>
                                <source srcSet={cloudBottomWebp}/>
                                <img src={cloudBottom} alt='clouds_bottom'/>
                            </picture>
                        </>
                    }
                </div>
            </div>
        </>
    )
}
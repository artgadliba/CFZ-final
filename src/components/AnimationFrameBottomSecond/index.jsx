import style from './styles.module.scss'
import clouds from './../../assets/img/MainCloudMob.png'
import cloudsWebp from './../../assets/img/new/MainCloudMob.webp'
import useWindowSize from "../../hooks/useWindowSize";
import cloudBottomSecondWebp from "../../assets/img/new/cloud_bottom_second.webp";
import cloudBottomSecond from "../../assets/img/new/cloud_bottom_second.png";
import React from "react";

export const AnimationFrameBottomSecond = () => {
    const {width} = useWindowSize()

    return (
        <>
            <div className={style.container}>
                <div className={style.wrapper}>
                    {width >= 768 ?
                        <>
                            <picture>
                                <source srcSet={cloudBottomSecondWebp}/>
                                <img src={cloudBottomSecond} alt='clouds_bottom'/>
                            </picture>
                            <picture>
                                <source srcSet={cloudBottomSecondWebp}/>
                                <img src={cloudBottomSecond} alt='clouds_bottom'/>
                            </picture>
                        </>
                        :
                        <>
                            <picture>
                                <source srcSet={cloudsWebp}/>
                                <img src={clouds} alt='clouds'/>
                            </picture>
                        </>
                    }
                </div>
            </div>
        </>
    )
}
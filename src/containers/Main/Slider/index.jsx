import React, {useState} from 'react';

import {Container} from 'components/Container';
import {VideoModal} from 'components/VideoModal';
import {SliderWithCard} from './SliderWithCard';

import style from './styles.module.scss'
import clsx from "clsx";
import cloud7 from "../../../assets/img/staticClouds/cloud7.png";
import cloud8 from "../../../assets/img/staticClouds/cloud8.png";
import cloud7Webp from "../../../assets/img/staticClouds/cloud7.webp";
import cloud8Webp from "../../../assets/img/staticClouds/cloud8.webp";
import avatar from "../../../assets/img/slider/avatar.png"
import avatarWebp from "../../../assets/img/slider/avatar.webp"
import sign from "../../../assets/img/slider/sign.png"
import signWebp from "../../../assets/img/slider/sign.webp"

export const Slider = () => {
    const [openedVideo, setOpenedVideo] = useState(null)

    return (
        <section className={style.section}>
            <Container>
                {openedVideo !== null && <VideoModal id={openedVideo} setOpenedVideo={setOpenedVideo}/>}
                <div className={style.slider}>
                    <SliderWithCard setOpenedVideo={setOpenedVideo}/>
                    <div className={style.description}>
                        <picture>
                            <source srcSet={cloud8Webp}/>
                            <img className={clsx(style.imageCloud, style.right)} src={cloud8} alt=""/>
                        </picture>
                        <picture>
                            <source srcSet={cloud7Webp}/>
                            <img className={clsx(style.imageCloud, style.left)} src={cloud7} alt=""/>
                        </picture>
                        <div className={style.title}>
                            <span className={style.content}>Made with love</span>
                            <span className={style.artist}>by jimipencils</span>
                        </div>
                        <div className={style.text}>
                            <p>
                                <picture>
                                    <source srcSet={avatarWebp}/>
                                    <img className={style.avatar} src={avatar} alt=""/>
                                </picture>
                                Im a visual artist, painter and parttime degen. My genuine love for cryptotwitter,
                                stories and people
                                that
                                made it so legendary inspired me to do Cryptofrenz. I always was a collector, a gamer,
                                raised on MTG
                                Card
                                games and building decks was my passion. I want to share with you all that happened to
                                me and this
                                blessed
                                community on the way up only.
                            </p>
                            <picture>
                                <source srcSet={signWebp}/>
                                <img className={style.sign} src={sign} alt="sign"/>
                            </picture>

                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
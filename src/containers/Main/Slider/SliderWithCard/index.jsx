import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { Button } from "components/Button";

import "swiper/css";
import style from "./styles.module.scss";

import { SLIDER_CARDS } from "constants/slider_cards";
import clsx from "clsx";
import cloud5 from "../../../../assets/img/staticClouds/cloud5.png";
import cloud6 from "../../../../assets/img/staticClouds/cloud6.png";
import cloud5Webp from "../../../../assets/img/staticClouds/cloud5.webp";
import cloud6Webp from "../../../../assets/img/staticClouds/cloud6.webp";

export const SliderWithCard = ({ setOpenedVideo }) => {
  const pagination = {
    clickable: true,
    el: ".swiper-pagination",
    renderBullet: function (index, className) {
      return '<div class="' + className + '">' + "</div>";
    },
  };

  return (
    <div className={style.content}>
      <picture>
        <source srcSet={cloud5Webp} />
        <img className={clsx(style.imageCloud, style.left)} src={cloud6} alt="" />
      </picture>
      <picture>
        <source srcSet={cloud6Webp} />
        <img className={clsx(style.imageCloud, style.right)} src={cloud5} alt="" />
      </picture>
      <div className="swiper-button-prev">
        <Button.WithArrow className={style.prev} />
      </div>
      <div className="swiper-button-next">
        <Button.WithArrow className={style.next} />
      </div>
      <div className="swiper-wrapper-block">
        <Swiper
          className="swiper-cards"
          spaceBetween={50}
          slidesPerView={1}
          pagination={pagination}
          modules={[Pagination, Navigation]}
          loop
          centeredSlides
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          breakpoints={{
            1025: {
              width: 500,
              slidesPerView: 1,
            },
          }}
        >
          {SLIDER_CARDS.map(({ image, id }) => (
            <SwiperSlide key={id}>
              <picture>
                <source srcSet={image.webp} />
                <img className={style.image} onClick={() => setOpenedVideo(id)} src={image.png} alt={id} />
              </picture>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination" />
        <span className="swiper-wrapper-text">Animated! Click the card</span>
      </div>
    </div>
  );
};

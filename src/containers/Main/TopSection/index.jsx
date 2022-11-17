import React from "react";
import { Header } from "../../../components/Header";
import { MainScreen } from "../MainScreen";
import style from "../styles.module.scss";
import { Container } from "../../../components/Container";
import topClouds from "../../../assets/img/headerCloud.png";
import topCloudsMobile from "../../../assets/img/headerCloudMob.png";
import topCloudsMobile460 from "../../../assets/img/headerCloudMob460.png";
import topCloudsMobileWebp from "../../../assets/img/new/HeaderCloudsMob.webp";
import topCloudsMobile460Webp from "../../../assets/img/headerCloudMob460.webp";
import topCloudsWebp from "../../../assets/img/new/HeaderCloudsDesck.webp";

const TopSection = () => {
  return (
    <Container fluid>
      <Header />
      <MainScreen />
      <picture>
        <source srcSet={topCloudsWebp} />
        <img className={style.headerClouds} src={topClouds} alt="" />
      </picture>
      <picture>
        <source srcSet={topCloudsMobileWebp} />
        <img className={style.mobile} src={topCloudsMobile} alt="" />
      </picture>
      <picture>
        <source srcSet={topCloudsMobile460Webp} />
        <img className={style.mobile460} src={topCloudsMobile460} alt="" />
      </picture>
    </Container>
  );
};

export default TopSection;

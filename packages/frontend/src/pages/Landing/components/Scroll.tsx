import React from "react";
import FivePaisaLogo from "../../../images/logos/5paisa_logo.jpg";
import GrowwLogo from "../../../images/logos/groww.png";
import AngelOneLogo from "../../../images/logos/angel_one_logo.png";
import UpstoxLogo from "../../../images/logos/upstox.png";
import KiteLogo from "../../../images/logos/kite.png";
import KotakLogo from "../../../images/logos/kotak.jpg";
import HdfcSkyLogo from "../../../images/logos/hdfc_sky.jpeg";
import PaytmMoneyLogo from "../../../images/logos/paytm_money.jpg";
import ICICILogo from "../../../images/logos/icici_direct.jpg";
import AxisLogo from "../../../images/logos/axis_direct.png";

import styles from "./scroll.module.css";

function Scroll() {
  return (
    <section className={styles.enableAnimation}>
      <div className={styles.marquee}>
        <div className={styles.marquee__fade_start}></div>
        <ul className={styles.marquee__content}>
          <div className={styles.marquee__item}>
            <img src={FivePaisaLogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={AngelOneLogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={GrowwLogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={UpstoxLogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={KiteLogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={KotakLogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={HdfcSkyLogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={PaytmMoneyLogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={ICICILogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={AxisLogo} alt="" />
          </div>
        </ul>

        <ul aria-hidden="true" className={styles.marquee__content}>
          <div className={styles.marquee__item}>
            <img src={FivePaisaLogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={AngelOneLogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={GrowwLogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={UpstoxLogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={KiteLogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={KotakLogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={HdfcSkyLogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={PaytmMoneyLogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={ICICILogo} alt="" />
          </div>
          <div className={styles.marquee__item}>
            <img src={AxisLogo} alt="" />
          </div>
        </ul>
        <div className={styles.marquee__fade_end}></div>
      </div>
    </section>
  );
}

export default Scroll;

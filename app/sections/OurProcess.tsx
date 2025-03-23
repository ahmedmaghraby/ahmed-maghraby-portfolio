"use client";

import { useEffect, useState } from "react";
import "swiper/css";
import "../assets/ourProcess.css";
import { lex } from "../helper/lex";
import { motion } from "framer-motion";

const OurProcess = () => {
  const [Swiper, setSwiper] = useState<any>(null);

  useEffect(() => {
    import("swiper").then((module) => {
      const SwiperClass = module.default;
      const swiperInstance = new SwiperClass(".process-slider", {
        loop: false,
        autoplay: {
          delay: 5000,
        },
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 1800,
        watchSlidesProgress: true,
        breakpoints: {
          576: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          992: { slidesPerView: 3 },
          1201: { slidesPerView: 3 },
          1367: { slidesPerView: 3 },
          1441: { slidesPerView: 4 },
        },
      });

      setSwiper(swiperInstance);
    });

    return () => Swiper && Swiper.destroy();
  }, []);

  return (
    <section className="flex justify-center w-full py-20 process-area">
      <div className="container">
        <div className="process-area-inner ">
          <div className="shape-1">
            <motion.img
              src="https://crowdytheme.com/html/arolax/assets/imgs/shape/img-s-48.webp" // تأكد إن الصورة موجودة عندك
              alt="Falling Feather"
              initial={{ y: -800, opacity: 0 }}
              animate={{
                y: 0, // تنزل لمكانها النهائي
                x: [0, -20, 10, -15, 5], // حركة تذبذب خفيفة أثناء السقوط
                rotate: [0, 5, -5, 3, -3], // تأرجح خفيف أثناء النزول
                opacity: 1,
              }}
              transition={{
                duration: 3,
                repeatDelay: 3,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </div>
          <h2
            className={`${lex.className} section-title ml-5 font-light leading-9  text-bg-dark`}
          >
            Our standard design thinking process
          </h2>
          <div className="process-wrapper-box">
            <div className="process-wrapper">
              <div className="swiper process-slider">
                <div className="swiper-wrapper">
                  <div
                    className="swiper-slide has_fade_anim"
                    data-ease="bounce"
                    data-delay="0.15"
                  >
                    <div className="process-box">
                      <span className="number">Step - 01</span>
                      <div className="icon">
                        <img
                          className="show-dark"
                          src="https://crowdytheme.com/html/arolax/assets/imgs/icon/icon-s-16-light.webp"
                          alt="process icon"
                        />
                      </div>
                      <div className="content">
                        <h3 className="title">
                          User <br />
                          Research
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div
                    className="swiper-slide has_fade_anim"
                    data-ease="bounce"
                    data-delay="0.30"
                  >
                    <div className="process-box">
                      <span className="number">Step - 02</span>
                      <div className="icon">
                        <img
                          className="show-dark"
                          src="https://crowdytheme.com/html/arolax/assets/imgs/icon/icon-s-17-light.webp"
                          alt="process icon"
                        />
                      </div>
                      <div className="content">
                        <h3 className="title">
                          Define <br />
                          Problems
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div
                    className="swiper-slide has_fade_anim"
                    data-ease="bounce"
                    data-delay="0.45"
                  >
                    <div className="process-box">
                      <span className="number">Step - 03</span>
                      <div className="icon">
                        <img
                          className="show-dark"
                          src="https://crowdytheme.com/html/arolax/assets/imgs/icon/icon-s-18-light.webp"
                          alt="process icon"
                        />
                      </div>
                      <div className="content">
                        <h3 className="title">
                          Design & <br />
                          Prototype
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div
                    className="swiper-slide has_fade_anim"
                    data-ease="bounce"
                    data-delay="0.60"
                  >
                    <div className="process-box">
                      <span className="number">Step - 04</span>
                      <div className="icon">
                        <img
                          className="show-dark"
                          src="https://crowdytheme.com/html/arolax/assets/imgs/icon/icon-s-19-light.webp"
                          alt="process icon"
                        />
                      </div>
                      <div className="content">
                        <h3 className="title">
                          Evaluation & <br />
                          Testing
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div
                    className="swiper-slide has_fade_anim"
                    data-ease="bounce"
                    data-delay="0.75"
                  >
                    <div className="process-box">
                      <span className="number">Step - 05</span>
                      <div className="icon">
                        <img
                          className="show-dark"
                          src="https://crowdytheme.com/html/arolax/assets/imgs/icon/icon-s-17-light.webp"
                          alt="process icon"
                        />
                      </div>
                      <div className="content">
                        <h3 className="title">
                          Define <br />
                          Problems
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div
                    className="swiper-slide has_fade_anim"
                    data-ease="bounce"
                    data-delay="0.90"
                  >
                    <div className="process-box">
                      <span className="number">Step - 06</span>
                      <div className="icon">
                        <img
                          className="show-dark"
                          src="https://crowdytheme.com/html/arolax/assets/imgs/icon/icon-s-18-light.webp"
                          alt="process icon"
                        />
                      </div>
                      <div className="content">
                        <h3 className="title">
                          Design & <br />
                          Prototype
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div
                    className="swiper-slide has_fade_anim"
                    data-ease="bounce"
                    data-delay="0.60"
                  >
                    <div className="process-box">
                      <span className="number">Step - 07</span>
                      <div className="icon">
                        <img
                          className="show-dark"
                          src="https://crowdytheme.com/html/arolax/assets/imgs/icon/icon-s-19-light.webp"
                          alt="process icon"
                        />
                      </div>
                      <div className="content">
                        <h3 className="title">
                          Implement & <br />
                          Deliver
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;

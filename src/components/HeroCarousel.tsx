"use client";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Pagination, Navigation } from "swiper/modules";

export default function HeroCarousel() {
  return (
    <Swiper
      className="relative h-screen w-full bg-black"
      speed={600}
      parallax={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Parallax, Pagination, Navigation]}
    >
      {/* Background Image */}
      <div
        slot="container-start"
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://wallpaperaccess.com/full/1526011.jpg)",
          transform: "translateZ(-23%)",
        }}
      ></div>

      {/* Slide 1 */}
      <SwiperSlide className="flex flex-col items-center justify-center bg-black p-10 text-white">
        <div
          className="mb-4 text-4xl font-light"
          style={{ transform: "translateZ(-300px)" }}
        >
          Slide 1
        </div>
        <div
          className="mb-4 text-2xl"
          style={{ transform: "translateZ(-200px)" }}
        >
          Subtitle
        </div>
        <div
          className="max-w-lg text-base leading-relaxed"
          style={{ transform: "translateZ(-100px)" }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
            laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
            Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
            Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper
            velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut
            libero. Aenean feugiat non eros quis feugiat.
          </p>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide className="flex flex-col items-center justify-center bg-black p-10 text-white">
        <div
          className="mb-4 text-4xl font-light"
          style={{ transform: "translateZ(-300px)" }}
        >
          Slide 2
        </div>
        <div
          className="mb-4 text-2xl"
          style={{ transform: "translateZ(-200px)" }}
        >
          Subtitle
        </div>
        <div
          className="max-w-lg text-base leading-relaxed"
          style={{ transform: "translateZ(-100px)" }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
            laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
            Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
            Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper
            velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut
            libero. Aenean feugiat non eros quis feugiat.
          </p>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide className="flex flex-col items-center justify-center bg-black p-10 text-white">
        <div
          className="mb-4 text-4xl font-light"
          style={{ transform: "translateZ(-300px)" }}
        >
          Slide 3
        </div>
        <div
          className="mb-4 text-2xl"
          style={{ transform: "translateZ(-200px)" }}
        >
          Subtitle
        </div>
        <div
          className="max-w-lg text-base leading-relaxed"
          style={{ transform: "translateZ(-100px)" }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            dictum mattis velit, sit amet faucibus felis iaculis nec. Nulla
            laoreet justo vitae porttitor porttitor. Suspendisse in sem justo.
            Integer laoreet magna nec elit suscipit, ac laoreet nibh euismod.
            Aliquam hendrerit lorem at elit facilisis rutrum. Ut at ullamcorper
            velit. Nulla ligula nisi, imperdiet ut lacinia nec, tincidunt ut
            libero. Aenean feugiat non eros quis feugiat.
          </p>
        </div>
      </SwiperSlide>

      {/* Add additional slides as needed */}
    </Swiper>
  );
}

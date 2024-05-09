"use client";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import SwiperPrevButton from "./SwiperPrevButton";
import SwiperNextButton from "./SwiperNextButton";
import { Database } from "@/types/supabase";
import { LazyImage } from "../LazyLoadImage";

export const PostSwiper = ({
  post,
}: {
  post: Database["public"]["Tables"]["POST"]["Row"] | null;
}) => {
  return (
    <Swiper className="relative" navigation={true}>
      <SwiperPrevButton />
      {post?.images.map((image) => (
        <SwiperSlide key={image}>
          <LazyImage
            wrapperClassName="block w-full h-full relative pt-[100%] bg-gray-600"
            className="absolute z-10 top-0 left-0 z-10 w-full h-full object-cover apsect-squre"
            src={image}
            alt=""
          />
        </SwiperSlide>
      ))}
      <SwiperSlide key="link-slider">
        <div className="relative">
          <img
            className="blur-lg"
            src={post?.images[post?.images.length - 1]}
            alt=""
          />
          <Link
            className={[
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
              "bg-black text-white hover:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 z-20",
            ].join(" ")}
            href={`${post?.link}`}
            target="_blank"
            rel="noreferrer"
          >
            더 보러가기
          </Link>
        </div>
      </SwiperSlide>
      <SwiperNextButton />
    </Swiper>
  );
};

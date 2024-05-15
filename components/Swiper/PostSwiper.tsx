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
              "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inline-flex items-center",
              "bg-black text-white hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 z-20",
            ].join(" ")}
            href={`${post?.link}`}
            target="_blank"
            rel="noreferrer"
          >
            더 보러가기&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </SwiperSlide>
      <SwiperNextButton />
    </Swiper>
  );
};

import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const LazyImage = (props: {
  wrapperClassName?: string;
  className?: string;
  src: string;
  alt?: string;
  effect?: "blur" | "black-and-white" | "opacity";
}) => (
  <LazyLoadImage
    wrapperClassName={props.wrapperClassName}
    className={props.className}
    src={props.src}
    alt={props.alt}
    effect={props.effect}
  />
);

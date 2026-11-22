import NextImage, { type ImageProps } from "next/image";
import type { ImgHTMLAttributes } from "react";
import { imageDelivery, mediaUrl } from "@/lib/media-url";
export default function Image(props: ImageProps) {
  return <NextImage {...props} src={typeof props.src === "string" ? mediaUrl(props.src)! : props.src} />;
}
export function AssetImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const delivery = typeof props.src === "string" ? imageDelivery[props.src.split("?",1)[0]] : undefined;
  return <img {...props} src={typeof props.src === "string" ? mediaUrl(props.src) : props.src} srcSet={props.srcSet ?? delivery?.srcSet} sizes={props.sizes ?? (delivery ? "(max-width: 600px) 90vw, 960px" : undefined)} />;
}

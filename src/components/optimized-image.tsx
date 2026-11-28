/* eslint-disable @next/next/no-img-element -- Responsive files are optimized once during the build. */
import NextImage, { type ImageProps } from "next/image";
import type { ImgHTMLAttributes } from "react";
import { preload } from "react-dom";
import { imageDelivery, mediaUrl } from "@/lib/media-url";

const nextOnlyProps = new Set(["src", "fill", "priority", "preload", "overrideSrc", "quality", "loader", "unoptimized", "placeholder", "blurDataURL", "onLoadingComplete"]);

/** Local assets use build-generated responsive files; Node never encodes them on demand. */
export default function Image(props: ImageProps) {
  const { src, fill, priority, preload: shouldPreload, overrideSrc } = props;
  const rest = Object.fromEntries(Object.entries(props).filter(([key]) => !nextOnlyProps.has(key))) as ImgHTMLAttributes<HTMLImageElement>;
  if (typeof src !== "string" || !src.startsWith("/") || src.startsWith("//")) {
    return <NextImage {...props} unoptimized />;
  }
  const delivery = imageDelivery[src.split("?", 1)[0]];
  const url = mediaUrl(overrideSrc ?? src)!;
  const highPriority = priority || shouldPreload || props.fetchPriority === "high";
  const sizes = props.sizes ?? (delivery ? "(max-width: 640px) 100vw, 960px" : undefined);
  if (highPriority) preload(url, { as: "image", imageSrcSet: overrideSrc ? undefined : delivery?.srcSet, imageSizes: sizes, fetchPriority: "high" });
  return <img {...rest} alt={props.alt} src={url} srcSet={overrideSrc ? undefined : delivery?.srcSet} sizes={sizes}
    width={fill ? undefined : props.width} height={fill ? undefined : props.height}
    loading={props.loading ?? (highPriority ? "eager" : "lazy")}
    fetchPriority={highPriority ? "high" : props.fetchPriority} decoding={props.decoding ?? "async"}
    style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...props.style } : props.style} />;
}

export function AssetImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const delivery = typeof props.src === "string" ? imageDelivery[props.src.split("?", 1)[0]] : undefined;
  return <img {...props} alt={props.alt ?? ""} src={typeof props.src === "string" ? mediaUrl(props.src) : props.src}
    srcSet={props.srcSet ?? delivery?.srcSet} sizes={props.sizes ?? (delivery ? "(max-width: 600px) 90vw, 960px" : undefined)}
    loading={props.loading ?? (props.fetchPriority === "high" ? "eager" : "lazy")} decoding={props.decoding ?? "async"} />;
}

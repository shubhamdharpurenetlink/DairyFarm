"use client";

import Image, { type ImageProps } from "next/image";
import { useMemo } from "react";
import { normaliseImageUrl } from "@/lib/imageUrl";

/**
 * Drop-in replacement for `next/image` that automatically normalises
 * Google Drive / Photos share links into direct-view URLs before passing
 * them down. Other URLs pass through untouched.
 */
export default function SmartImage(props: ImageProps) {
  const { src, ...rest } = props;
  const finalSrc = useMemo(() => {
    if (typeof src !== "string") return src;
    return normaliseImageUrl(src);
  }, [src]);
  return <Image {...rest} src={finalSrc} />;
}

import { ImgHTMLAttributes } from "react";

export interface FallbackImageProps extends ImgHTMLAttributes<HTMLImageElement>{
    src: string;
    fallback: string
}

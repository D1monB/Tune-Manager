import { FC, useEffect, useState } from "react";
import { FallbackImageProps } from "./FallbackImage.props.ts";

const FallbackImage: FC<FallbackImageProps> = ({ src, fallback, ...props } ) => {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setImgSrc(src);
        img.onerror = () => setImgSrc(fallback);

    }, [src, fallback]);

    return <img src={imgSrc} {...props} />;
};

export default FallbackImage;
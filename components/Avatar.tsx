import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface ImageType {
  src: string;
  alt: string;
  size: number;
  className: string;
}
const Avatar = ({ src, alt, size, className }: ImageType) => {
  const fallbackImage = "/images/profile-pic.png";
  return (
    <div className={twMerge("rounded-full overflow-hidden w-fit", className)}>
      <Image
        src={src || fallbackImage}
        alt={alt}
        width={size}
        height={size}
        onError={() => console.log("Error in Avatar")}
      />
    </div>
  );
};

export default Avatar;

import Image from "next/image";
import { twMerge } from "tailwind-merge";

interface ImageType {
  src: string;
  alt: string;
  size: number;
  className: string;
}
const Avatar = ({ src, alt, size, className }: ImageType) => {
  return (
    <div className={twMerge("rounded-full overflow-hidden w-fit", className)}>
      <Image src={src} alt={alt} width={size} height={size} />
    </div>
  );
};

export default Avatar;

import Image, { StaticImageData } from 'next/image';

type AvatarProps = {
    src: StaticImageData;
    alt: string;
};

const Avatar: React.FC<AvatarProps> = ({ src, alt }) => (
    <Image
        className="rounded-full border-2 border-slate-900 box-content"
        src={src}
        width={40}
        height={40}
        alt={alt}
    />
);

export default Avatar;

import ImageAnchor from "./ImageAnchor";
export default function OutlinedImageAnchor({ className = "", image, ...props }) {
    return (
        <ImageAnchor className={`outline-[0.2rem] outline-offset-[0.2rem] ${className} ${image}`} {...props} />
    );
}
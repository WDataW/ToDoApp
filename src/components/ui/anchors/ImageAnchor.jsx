import Anchor from "./Anchor";

export default function ImageAnchor({className="", image , id, ...props}){
    return(
        <Anchor id={id} className={`  ${className || "inline-block" } ${image} bg-center bg-cover `} {...props}/>
    );
}
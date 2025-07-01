export default function Anchor({className="", id, children, ...props}){
    return(
        <a id={id} className={`${className}`}  {...props}>
            {children}
        </a>
    );
}
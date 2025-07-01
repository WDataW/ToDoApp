export default function Nav({className="", ulClassName, children, ...props}){
    return(
        <nav className={` ${className}`} {...props}>
            <ul className={`flex ${ulClassName}`}>
                {children}
            </ul> 
        </nav>
    );
}
export default function Nav({className="", ulClassName, children, ...props}){
    return(
        <nav className={` ${className}`} {...props}>
            <ul className={`flex list-none ${ulClassName}`}>
                {children}
            </ul> 
        </nav>
    );
}
import Message from "./Message"
export default function ErrorMessage({children, className}){
    return(<Message className={className} theme="error">{children}</Message>);
}
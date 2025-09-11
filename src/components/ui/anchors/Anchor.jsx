import { Link } from "react-router-dom";

export default function Anchor({ className = "", id, children, ...props }) {
    return (
        <Link id={id} href={null} className={`${className}`}  {...props}>
            {children}
        </Link>
    );
}
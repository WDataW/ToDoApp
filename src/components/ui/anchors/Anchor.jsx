export default function Anchor({ className = "", id, children, ...props }) {
    return (
        <a id={id} href="" className={`${className}`}  {...props}>
            {children}
        </a>
    );
}
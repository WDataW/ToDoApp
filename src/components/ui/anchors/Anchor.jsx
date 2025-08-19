export default function Anchor({ className = "", id, children, ...props }) {
    return (
        <a id={id} href={null} className={`${className}`}  {...props}>
            {children}
        </a>
    );
}
import Trophy from "./Trophy";

export default function OnTime({ className = "", children, ...props }) {
    return (
        <Trophy className={`${className}`} {...props}>
            {children}
        </Trophy>
    );
}
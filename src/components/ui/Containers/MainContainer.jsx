export default function MainContainer({ className = "", children, ...props }) {
    return (
        <main className={`px-[1rem] py-[0.2rem] sm:px-[2rem] ${className}`} {...props}>
            {children}
        </main>
    );
}
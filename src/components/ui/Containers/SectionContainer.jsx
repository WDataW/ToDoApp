export default function SectionContainer({ className = "", children, ...props }) {
    return (
        <section className={`border shadow-white rounded-[0.5rem] py-[1rem] px-[0.6rem] ${className}`} {...props}>
            {children}
        </section>
    );
}
import KeyboardInput from "./KeyboardInput";

export default function SearchInput({ className = "", children, ...props }) {
    return (
        <KeyboardInput className={`${className}`}
            darkIcon="src/assets/icons/dark/search.svg"
            lightIcon="src/assets/icons/light/search.svg"
            {...props}>
            {children}
        </KeyboardInput>
    );
}
import ThemedRectButton from "./ThemedRectButton";

export default function SignUpButton({ className, handleClick }) {
    return (<ThemedRectButton
        type="submit"
        handleClick={handleClick}
        className={className}
    />
    );
}
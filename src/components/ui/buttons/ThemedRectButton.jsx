import Button from "./Button";
import { useTheme } from "../../../context/Theme";

export default function ThemedRectButton({ loading, customTheme, children, handleClick, className, disabled, ...props }) {
    const [theme] = useTheme();
    return (
        <Button
            theme={customTheme || theme}
            shape="rect"
            className={`${className}`}
            handleClick={handleClick}
            disabled={loading || disabled}
            {...props}
        >
            {loading && <div className="flex h-[1.5rem] items-center justify-center"><span className="h-[1.2rem] inline-block aspect-1/1 border border-[0.2rem]  border-b-[#7C7C7C] animate-spin rounded-full"></span></div>}
            {!loading && children}
        </Button>
    );
}
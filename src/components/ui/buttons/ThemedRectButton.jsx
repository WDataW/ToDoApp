import Button from "./Button";
import { useTheme } from "../../../context/Theme";

export default function ThemedRectButton({customTheme ,children, handleClick, className, disabled}){
    const [theme] = useTheme();
    return(
        <Button
            theme={customTheme || theme}
            shape="rect"
            className={className}
            handleClick={handleClick}
            disabled={disabled}
        >
            {children}
        </Button>
    );
}
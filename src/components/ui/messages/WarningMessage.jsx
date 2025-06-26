import Message from "./Message";
import { useTheme } from "../../../context/Theme";
export default function WarningMessage({children, className}){
    const [theme] = useTheme();
    return(<Message className={className} theme={theme}>{children}</Message>);
}
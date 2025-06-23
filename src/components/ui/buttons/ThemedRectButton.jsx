import Button from "./Button";
import { useTheme } from "../../../context/Theme";

export default function ThemedRectButton({label, handleClick}){
    const [theme] = useTheme();
    return(
        <Button
            bgColor={theme=="dark"?"orange":"blue"}
            shape="rect"
            label={label}
            handleClick={handleClick}
        />
    );
}
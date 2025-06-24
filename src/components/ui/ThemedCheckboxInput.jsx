import { useTheme, accentThemeColors } from "../../context/Theme";

export default function CheckboxInput({className=""}){
    const [theme] = useTheme();
    return(<input type='checkbox' className={`${accentThemeColors[theme]} ${className} `} />);
}
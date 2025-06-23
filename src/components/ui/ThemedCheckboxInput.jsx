import { useTheme } from "../../context/Theme";
const accentColors={
    dark:"accent-[#F97316]",
    light:"accent-[#3B82F6]"
}
export default function CheckboxInput({className=""}){
    const [theme] = useTheme();
    console.log(accentColors[theme])
    return(<input type='checkbox' className={`${accentColors[theme]} ${className}`} />);
}
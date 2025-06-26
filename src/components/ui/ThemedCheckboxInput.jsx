import { useTheme, accentThemeColors } from "../../context/Theme";
import { useId } from "react";
export default function ThemedCheckboxInput({className="", children, ref, checked, handleChange}){
    const [theme] = useTheme();
    const id = useId();
    return(
        <>
            <input ref={ref} onChange={handleChange} checked={checked} type='checkbox' id={id} className={`${accentThemeColors[theme]} ${className} `} />
            <label className="opacity-50 text-[0.85rem] align-middle ml-[0.3rem]" htmlFor={id}>{children}</label>
        </>
    );
}
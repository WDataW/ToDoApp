
import { useTheme } from "../../../context/Theme";
import { useId } from "react";

const commonStyles = "w-full outline-none py-[0.4rem] px-[0.8rem]  rounded-[0.4rem] placeholder-opacity-50";

const themeStyles = {
    light: "bg-[#F0F1F2] text-black",
    dark: "bg-[#1f1e1e] text-white"
};
const icons = {
    light: "",
    dark: ""
}
function setIcons(light, dark) {
    icons["light"] = light;
    icons["dark"] = dark;
}
export default function KeyboardInput({ type = "text", required = true, label = "", placeholder = "", lightIcon = "", darkIcon = "", iconAlt = "", className = "", handleChange, value, ref, ...props }) {
    const [theme] = useTheme();
    setIcons(lightIcon, darkIcon);
    const id = useId();
    if (icons[theme]) {
        return (<>
            {label && <label className="ms-[0.2rem]" htmlFor={id}>{label}</label>}
            <div className={`relative ${className} `}>
                <img src={icons[theme]} alt={iconAlt} className="absolute top-1/2 -translate-y-1/2 start-[0.8rem] h-1/2" />
                <input type={type} value={value} id={id} required={required} ref={ref} placeholder={placeholder} onChange={handleChange} className={`${commonStyles} ${themeStyles[theme]} border-s ps-[2.5rem]`}{...props} />
            </div>
        </>
        );
    }
    else {
        return (<>
            {label && <label className="ms-[0.2rem]" htmlFor={id}>{label}</label>}
            <input type={type} value={value} id={id} required={required} ref={ref} placeholder={placeholder} onChange={handleChange} className={`${commonStyles} ${themeStyles[theme]} ${className} border-s`} {...props} />
        </>
        );
    }
}

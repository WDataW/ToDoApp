
import { useTheme } from "../../../context/Theme";

const commonStyles="w-full outline-none py-[0.4rem] px-[0.8rem]  rounded-md placeholder-opacity-50";

const themeStyles={
    light:"bg-[#F0F1F2] text-black",
    dark:"bg-[#121212] text-white"
};
const icons={
    light:"",
    dark:""
}
function setIcons(light, dark){
    icons["light"]= light;
    icons["dark"]= dark;
}
export default function TextInput({type="text", placeholder="input", lightIcon="", darkIcon="", iconAlt="", className="", handleChange }){
    const [theme] = useTheme();
    setIcons(lightIcon, darkIcon);
    
    if(icons[theme]){
        return(<div className={`relative ${className}`}>
                  <img src={icons[theme]} alt={iconAlt} className="absolute top-1/2 -translate-y-1/2 left-[1rem] h-1/2"  />
                  <input type={type} placeholder={placeholder} onChange={handleChange} className={`${commonStyles} ${themeStyles[theme]}  pl-10`}  />
               </div>);    
    }
    else {
        return(<>
                <input type={type} placeholder={placeholder} onChange={handleChange} className={`${commonStyles} ${themeStyles[theme]} ${className}`} />
               </>
        );
    }
}

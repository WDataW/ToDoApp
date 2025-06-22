
const commonStyles="bg-[#F0F1F2] text-black w-full outline-none py-[0.4rem] px-[0.8rem]  rounded-full placeholder-opacity-50";
const darkStyles="dark:bg-[#121212] dark:text-white";
export default function TextInput({type="text", placeholder="input", lightIcon="", darkIcon="", iconAlt="", handleChange }){
    if(lightIcon){
        return(<div className="relative">
                  <img src={darkIcon} alt={iconAlt} className="absolute top-1/2 -translate-y-1/2 left-[1rem] h-1/2" />
                  <input type={type} placeholder={placeholder} onChange={handleChange} className={`${commonStyles} ${darkStyles} pl-10`}  />
               </div>);    
    }
    else {
        return(<><input type={type} placeholder={placeholder} onChange={handleChange} className={`${commonStyles} ${darkStyles}`} /></>);
    }
}

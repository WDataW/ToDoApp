import { ThemedRectButton } from "./buttons";
import { gradientColors, useTheme, hoverTextThemeColors } from "../../context/Theme";
import { useEffect, useState } from "react";
export default function greetingBox({className="" , children, ...props}){
    const [theme] = useTheme();
    const hoverTextColor =hoverTextThemeColors[theme];
    const [isMounted, setIsMounted] = useState(false);
    useEffect(()=>{
        setIsMounted(true);
        ()=>{
            setIsMounted(false)
        }
    },[]);
    return(
        <div className={`text-white animate-radial bg-radial-[at_70%_100%] bg-size-[210%] ${gradientColors[theme]} flex items-end justify-start w-full p-[2rem]  rounded-[0.5rem] aspect-3/2 sm:aspect-3/2 sm:max-w-1/2`} {...props}>
            <div className={`text-shadow-lg/5 ${className}`}>
                <h2 className="">Welcome Back, Wael</h2>
                <p className="mb-[2rem] text-[0.8rem]">Let's make today productive. Check out your tasks!</p>
                <ThemedRectButton customTheme="transparent" className={`border-[0.1rem] bg-[rgba(0,0,0,0.10)] max-w-[10rem] transition duration-300 hover:bg-white ${hoverTextColor}`}>View All Tasks</ThemedRectButton>    
            </div>
        </div>
    );
}
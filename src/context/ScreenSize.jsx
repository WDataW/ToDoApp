import { createContext, useContext, useEffect, useState } from "react";
export const ScreenWidth = createContext();

export function useScreenWidth(){
    return useContext(ScreenWidth);
}
export default function ScreenSize({children}){
    const [screenWidthState, setScreenWidthState] = useState(window.innerWidth);

    function handleResize(){
        setScreenWidthState(window.innerWidth);
    }
    useEffect(()=>{
        window.addEventListener("resize",
            handleResize
        );

        return ()=>{
            window.removeEventListener("resize",
                handleResize    
            );
        }
    },[]);

    
    return(
        <ScreenWidth value={screenWidthState} >
            {children}
        </ScreenWidth>
    );
}
import { Page, KeyboardInput, ThemedAnchor, ThemedRectButton } from "../../..";
import { useTheme } from "../../../../../context/Theme";
import { commonStyles } from "../commonStyles";
import { useTranslation } from "../../../../../context/Language";
import { useState, useRef, useEffect } from "react";
const initialCode={
    0: "",
    1: "",
    2: "",
    3: ""
}

// to do: focus on the first input with effect

export default function VerificationCodePage({email="you@example.com"}){
    // temporary
    useEffect(()=>{
        getMap().get(0).focus();
    },[]);

    const [theme] = useTheme();

    const codeKeys = ["0","1","2","3"];
    const [code, setCode] = useState(initialCode);
    function handleChange(e, i){
        const inputValue =e.target.value;
        const newValue = inputValue.length>1? inputValue.charAt(1): inputValue.charAt(0);
        
        setCode({...code, [i]:newValue });
        
        const map = getMap()
        const nextInputIndex = i==3 ? 0 : i+1
        const nextInputElement = map.get(nextInputIndex);
        if(!map.get(i).value)return;// means the current input box has been cleared no need to move to the next
        
        (nextInputIndex!==0 && nextInputElement.focus());
        (nextInputIndex==0 && map.get(3).blur())
        
        for(let i=0; i<4; i++){
            if(!map.get(i).value){
                return
            }   
        }
        document.getElementById("verificationCodeForm").submit();
        
    }
    
    

    const inputElements = useRef(null);
    function getMap(){
        if(!inputElements.current){
            inputElements.current = new Map();
        }
        return inputElements.current;
    }

    const t = useTranslation();
    const [styles, lowAlphaBgColor] = commonStyles;
    return(
        <Page className={styles["page"]}>
            <div className={`${styles["box"]} ${lowAlphaBgColor[theme]} ${theme}-outterShadow max-w-[23.5rem]`}>     
                <h2 className="text-center ">{t("titles.resetPassword")}</h2>
                <p className="text-center opacity-70 mb-[2rem]">{t("terms.weSentACodeTo")} {email}</p>
                <form id={"verificationCodeForm"} action="">
                <div className="flex gap-[0.4rem]" dir="ltr">
                        {
                                codeKeys.map((_,i)=>
                                    <KeyboardInput
                                        key={i}
                                        ref={(ref)=>{
                                            const map = getMap();
                                            map.set(i,ref);
                                        }}
                                        value={code[i]}
                                        handleChange={(e)=>{handleChange(e, i)}}
                                        type="number"
                                        required={true}
                                        className="mb-[0.65rem] aspect-1/1 text-center text-3xl  "/>
                                )
                        }
                    </div>
                    <ThemedRectButton label={t("titles.continue")} type="submit" disabled={!code["0"] || !code["1"] || !code["2"] || !code["3"]}></ThemedRectButton>
                </form>    
                 <a href="" className="text-[0.8rem] opacity-50 ">{t("titles.signIn")}</a>
                    <p className="text-[0.8rem] opacity-70 text-center mt-[0.75rem]">{t("terms.didntRecieveAnEmail")} <ThemedAnchor href="">{t("terms.sendAgain")}</ThemedAnchor></p>
            </div>
            
        </Page>
    );
}
import LockFocusPage from "@/Pages/LockFocusPage";
import { YesNoButtons } from ".";
import { bgColors, useTheme } from "@/context/Theme";
export default function YesNoPopUp({ yes, no, yesFunc = () => { }, noFunc = () => { }, className = "", children, ...props }) {
    const [theme] = useTheme();
    return (
        <LockFocusPage customTheme="darkenBg" className={`flex  items-center justify-center ${className}`} {...props}>
            <div className="w-[12rem] flex flex-col iterms-center justify-center">
                <div className={`border rounded-[0.3rem] p-[1rem] mb-[0.5rem] ${bgColors[theme]}`}>
                    {children}
                </div>
                <YesNoButtons className="justify-between" yes={yes} no={no} yesFunc={yesFunc} noFunc={noFunc}></YesNoButtons>
            </div>
        </LockFocusPage>
    );
}
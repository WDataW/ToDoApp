import { motion } from "motion/react";
import { MeatballMenu } from "../buttons";
import { useState } from "react";
import { createPortal } from "react-dom";
import ActionsContainer from "./ActionsContainer";

let actionsMenu;
export default function TaskCategory({ i, active, handleClick = {}, tag = {}, className = "", children, ...props }) {
    const color = tag.icon.replace("bg-[", "").replace("]", "");
    const [showActionsMenu, setShowActionsMenu] = useState(false);
    function handleMeatballClick(e) {
        const meatballButton = e.target;
        if (!showActionsMenu) {
            const position = meatballButton.getBoundingClientRect();
            const scrolableParent = meatballButton.closest(".tags-list");
            actionsMenu = <ActionsContainer
                yOffset={5.3}
                actionsArray={[
                    { label: "edit", action: "" },
                    { label: "delete", action: "" }
                ]}
                scrolableParent={scrolableParent}
                meatballButton={meatballButton}
                hideMenu={hideActionsMenu}
                position={position}
            />
        }
        setShowActionsMenu(!showActionsMenu);
    }

    function hideActionsMenu() {
        setShowActionsMenu(false);

    }
    return (
        <>
            {
                !active.includes(tag.title) ? (
                    <div className="relative">
                        {showActionsMenu && createPortal(actionsMenu, document.querySelector("main"))}
                        <motion.button
                            style={{ backgroundColor: color, backgroundImage: `radial-gradient(at 10% 0%, ${color} 0%, white 100%)` }}
                            initial={{}}
                            animate={{}}
                            id={tag.title} onClick={handleClick}
                            className={`${className} h-[5rem] shadow-sm/40 flex items-end  min-w-[10rem]"} ${tag.icon}   rounded-[0.5rem]`} {...props}>
                            <span className="w-full pe-[2.5rem] text-nowrap text-start text-black font-bold ps-[0.5rem] mb-[0.3rem]">#{tag.title}</span>
                        </motion.button >
                        <MeatballMenu onClick={(e) => {
                            handleMeatballClick(e);
                        }} customTheme="light" className="absolute bottom-[0.3rem] end-[0.5rem] meatball-actions ms-auto me-[0.25rem] mt-[0.65rem]  h-[1.4rem] w-[1.4rem]"></MeatballMenu>                        {children}

                    </div>
                ) : (
                    <div className="relative">
                        {showActionsMenu && createPortal(actionsMenu, document.querySelector("main"))}
                        <motion.button
                            style={{ backgroundColor: color, backgroundImage: `radial-gradient(at 10% 0%, ${color} 0%, white 100%)` }}
                            initial={{ scaleY: 1 }}
                            animate={{ scaleY: 1.1 }}
                            id={tag.title} onClick={handleClick}
                            className={`${className} h-[5rem] shadow-sm/40 flex items-end   ${tag.icon} rounded-[0.5rem]`} {...props}>
                            <span className="w-full  pe-[2.5rem] text-nowrap text-start  text-black font-bold ps-[0.5rem] mb-[0.3rem]">#{tag.title}</span>
                            {children}
                        </motion.button>
                        <MeatballMenu onClick={(e) => {
                            handleMeatballClick(e);
                        }} customTheme="light" className="absolute bottom-[0.3rem] end-[0.5rem] meatball-actions ms-auto me-[0.25rem] mt-[0.65rem]  h-[1.4rem] w-[1.4rem]"></MeatballMenu>                        {children}

                    </div>
                )
            }
        </>
    );
}
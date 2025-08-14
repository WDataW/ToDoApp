import { motion } from "motion/react";
import { MeatballMenu } from "../buttons";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import ActionsContainer from "./ActionsContainer";
import EditTag from "./EditTag";
import { useTranslation } from "@/context/Language";
import { interpreteBuiltInTagTitle, useDeleteTag } from "./tasks";
import DeleteSomething from "../buttons/DeleteSomething";

let actionsMenu;
export default function TaskCategory({ i, setActiveTags, active, handleClick = () => { }, tag = {}, className = "", children, ...props }) {
    const [deleteMode, setDeleteMode] = useState(false);
    const color = tag.icon.replace("bg-[", "").replace("]", "");
    const [showActionsMenu, setShowActionsMenu] = useState(false);
    const deleteTag = useDeleteTag();
    const t = useTranslation();
    const selfRef = useRef();
    const [editMode, setEditMode] = useState();

    let tagTitle = tag.title;
    let tagId = tag.id;
    if (tag?.builtIn) {
        tagTitle = interpreteBuiltInTagTitle(tag, t);
        tagId = tagTitle;
    }

    function editTagAction(e) {
        const main = e.target.closest("main");
        main.classList.add("hidden");
        const pageHeader = main.parentElement.querySelector("header");
        pageHeader.classList.add("hidden");
        setEditMode(true);
    }
    function closeEditTag() {
        const main = selfRef.current.closest("main");
        main.classList.remove("hidden");
        const pageHeader = main.parentElement.querySelector("header");
        pageHeader.classList.remove("hidden");
        setEditMode(false);
    }
    function startDeleting() {
        setDeleteMode(true);
    }
    function stopDeleting() {
        setDeleteMode(false);
    }
    function handleMeatballClick(e) {
        const meatballButton = e.target;
        if (!showActionsMenu) {
            const position = meatballButton.getBoundingClientRect();
            const scrolableParent = meatballButton.closest(".tags-list");
            actionsMenu = <ActionsContainer
                yOffset={5.3}
                actionsArray={[
                    { label: "edit", action: editTagAction },
                    { label: "delete", action: startDeleting }
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

    function processDeletingTag() {
        const newActiveTags = active.filter((a) => a !== tagId);
        setActiveTags(newActiveTags);
        deleteTag(tag);
    }
    return (
        <>
            {
                !active.includes(tagTitle) && !active.includes(tagId) ? (
                    <div ref={selfRef} className="relative inline-block">
                        {editMode && createPortal(<EditTag heading={t("titles.editTag")} yes={t("terms.save")} no={t("terms.cancel")} tagToEdit={tag} close={closeEditTag} />, document.querySelector("main").parentElement)}
                        {deleteMode && createPortal(<DeleteSomething something={tagTitle} title={t("terms.tag")} yesFunc={processDeletingTag} noFunc={stopDeleting} />, selfRef.current.closest("main").parentElement)}
                        {showActionsMenu && createPortal(actionsMenu, document.querySelector("main"))}
                        <motion.button
                            style={{ backgroundColor: color, backgroundImage: `radial-gradient(at 10% 0%, ${color} 0%, white 100%)` }}
                            initial={{ scaleY: 1 }}
                            animate={{}}
                            id={tagId} onClick={handleClick}
                            className={`${className}  min-w-[10rem] h-[5rem] shadow-sm/40 flex items-end  min-w-[10rem]"} ${tag.icon}   rounded-[0.5rem]`} {...props}>
                            <span className="w-full pe-[2.5rem] text-nowrap text-start text-black  capitalize font-bold ps-[0.5rem] mb-[0.3rem]">#{tagTitle}</span>
                        </motion.button >
                        <MeatballMenu onClick={(e) => {
                            handleMeatballClick(e);
                        }} customTheme="light" className="absolute bottom-[0.3rem] end-[0.5rem] meatball-actions ms-auto me-[0.25rem] mt-[0.65rem]  h-[1.4rem] w-[1.4rem]"></MeatballMenu>
                        {children}

                    </div>
                ) : (
                    <div ref={selfRef} className="relative inline-block">
                        {editMode && createPortal(<EditTag heading={t("titles.editTag")} yes={t("terms.save")} no={t("terms.cancel")} tagToEdit={tag} close={closeEditTag} />, document.querySelector("main").parentElement)}
                        {deleteMode && createPortal(<DeleteSomething something={tagTitle} title={t("terms.tag")} yesFunc={processDeletingTag} noFunc={stopDeleting} />, selfRef.current.closest("main").parentElement)}
                        {showActionsMenu && createPortal(actionsMenu, document.querySelector("main"))}
                        <motion.button
                            style={{ backgroundColor: color, backgroundImage: `radial-gradient(at 10% 0%, ${color} 0%, white 100%)` }}
                            initial={{ scaleY: 1 }}
                            animate={{ scaleY: 1.1 }}
                            id={tagId} onClick={handleClick}
                            className={`${className}  min-w-[10rem] h-[5rem] shadow-sm/40 flex items-end   ${tag.icon} rounded-[0.5rem]`} {...props}>
                            <span className="w-full capitalize  pe-[2.5rem] text-nowrap text-start  text-black font-bold ps-[0.5rem] mb-[0.3rem]">#{tagTitle}</span>
                            {children}
                        </motion.button>
                        <MeatballMenu onClick={(e) => {
                            handleMeatballClick(e);
                        }} customTheme="light" className="absolute bottom-[0.3rem] end-[0.5rem] meatball-actions ms-auto me-[0.25rem] mt-[0.65rem]  h-[1.4rem] w-[1.4rem]"></MeatballMenu>
                        {children}
                    </div>
                )
            }
        </>
    );
}
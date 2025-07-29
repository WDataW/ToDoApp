import { AnimatePresence, motion } from "motion/react";
export default function TaskCategory({ i, active, handleClick = {}, tag = {}, className = "", children, ...props }) {

    return (
        <>
            {
                !active.includes(tag.title) ? (
                    <motion.button initial={{ minWidth: "10.5rem" }} animate={{ minWidth: "10rem" }} id={tag.title} onClick={handleClick} className={`${className} flex items-end aspect-2/1  "min-w-[10rem]"} ${tag.icon} rounded-[0.5rem]`} {...props}>
                        <span className="w-full  text-start text-black font-bold ps-[0.5rem] mb-[0.3rem]">#{tag.title}</span>
                        {children}
                    </motion.button>
                ) : (
                    <motion.button initial={{ minWidth: "10rem" }} animate={{ minWidth: "11.5rem" }} id={tag.title} onClick={handleClick} className={`${className} flex items-end aspect-2/1  ${tag.icon} rounded-[0.5rem]`} {...props}>
                        <span className="w-full  text-start text-black font-bold ps-[0.5rem] mb-[0.3rem]">#{tag.title}</span>
                        {children}
                    </motion.button>
                )
            }
        </>


    );
}
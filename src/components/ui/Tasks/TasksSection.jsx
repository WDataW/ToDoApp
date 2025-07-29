import { SectionContainer } from "../../ui";
import TasksContainer from "./TasksContainer";
import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
export default function TasksSection({ className = "", heading = "", children, ...props }) {

    return (

        <motion.div exit={{ y: 25, opacity: 0 }} initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={className} >
            <SectionContainer className={`flex  flex-col   `} >
                <h3 className="border-b mb-[1rem] mx-[0.4rem]">{heading.join(" & ")}</h3>
                <TasksContainer {...props} />
            </SectionContainer>
        </motion.div >


    );
}
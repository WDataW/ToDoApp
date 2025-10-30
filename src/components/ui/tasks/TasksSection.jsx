import { useTranslation } from "@/context/Language";
import { SectionContainer } from "../../ui";
import { headingsInterpreter } from "./tasks";
import TasksContainer from "./TasksContainer";
import { motion } from "motion/react";
export default function TasksSection({ className = "", customHeading = "", heading = "", children, ...props }) {
    heading = heading.map((head) => headingsInterpreter(head));

    const t = useTranslation();
    return (
        <motion.div exit={{ y: 25, opacity: 0 }} initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={className} >
            <SectionContainer className={`h-full flex  flex-col `} >
                <h3 className="flex justify-between flex-wrap  capitalize border-b mb-[1rem] mx-[0.4rem]">{customHeading && <span className="me-[0.5rem]">{customHeading}</span>}<span>{heading.length != 0 ? heading.join(` ${t("terms.&")} `) : t("terms.all")}</span></h3>
                <TasksContainer {...props} />
            </SectionContainer>
        </motion.div >


    );
}
import { useTranslation } from "@/context/Language";
import { SectionContainer } from "../../ui";
import { headingsInterpreter } from "./tasks";
import TasksContainer from "./TasksContainer";
import { motion } from "motion/react";
let c = 0;
export default function TasksSection({ className = "", heading = "", children, ...props }) {
    heading = heading.map((head) => headingsInterpreter(head));

    const t = useTranslation();
    return (
        <motion.div exit={{ y: 25, opacity: 0 }} initial={{ y: 25, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={className} >
            <SectionContainer className={`h-full flex  flex-col `} >
                <h3 className="capitalize border-b mb-[1rem] mx-[0.4rem]">{heading.length != 0 ? heading.join(` ${t("terms.&")} `) : t("terms.all")}</h3>
                <TasksContainer {...props} />
            </SectionContainer>
        </motion.div >


    );
}
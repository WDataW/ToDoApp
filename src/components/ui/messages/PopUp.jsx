import { useEffect, useState } from "react"
import { ErrorMessage } from ".";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "@/context/Language";


export default function PopUp({ error, onClose }) {
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        setVisible(true);
        const timerId = setTimeout(handleClose, 2000);
        return () => { clearTimeout(timerId) }
    }, [error]);
    const handleClose = () => {
        setVisible(false);
        setTimeout(onClose, 200)
    }
    const t = useTranslation();

    return (
        <AnimatePresence>
            {
                visible &&
                <motion.div initial={{ y: "-130%" }} exit={{ y: "-130%" }} animate={{ y: 0 }} className="flex gap-[0.5rem] justify-between items-center px-[0.8rem] py-[0.45rem] left-1/2 -translate-x-[calc(50%+0.5rem)] border-[0.1rem] border-[#78000e] fixed z-99999 top-[0.7rem] h-[4rem] max-w-[20rem] w-[80%] mx-[0.5rem]  max-w-[20rem] rounded-[0.8rem] bg-[#ECC8C5] " >
                    <ErrorMessage className={"text-[1rem]"}>{error?.message || t("errors.somethingWentWrong")}</ ErrorMessage>
                    <button onClick={handleClose} className="p-[0.2rem] flex-shrink-0 bg-[url(/src/assets/icons/light/x.svg)] bg-contain bg-center bg-no-repeat h-full w-[1rem]"></button>
                </motion.div >
            }
        </AnimatePresence>
    );
}
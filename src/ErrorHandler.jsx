import PopUp from "@/components/ui/messages/PopUp";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";


const subscribers = new Set();
export const subscribeToErrors = (callback) => {
    subscribers.add(callback);
    return () => subscribers.delete(callback)
}
export const broadcastError = (error) => {
    subscribers.forEach((subscriber) => { subscriber?.(error) });
}
export default function ErrorHandler({ className = "", children, ...props }) {
    const [errors, setErrors] = useState([]);
    const pushError = (newError) => {
        setErrors((prev) => [...prev, newError]);
    }
    const popError = () => {
        setErrors((prev) => prev.slice(1));
    }
    useEffect(() => {
        return subscribeToErrors(pushError);
    }, []);
    return (
        <div>
            {errors.length > 0 && createPortal(<PopUp error={errors[0]} onClose={popError} />, document.getElementById('root'))}
            {children}
        </div>
    );
}
import { useEffect, useState } from "react";
import { EmailInput, UsernameInput } from "../keyboardInputs";

export default function UserInit({ info, setInfo, className = "", children, ...props }) {
    const [fullName, setFullName] = useState(info.fullName);
    const [email, setEmail] = useState(info.email);

    useEffect(() => {
        setInfo({ ...info, fullName, email });
    }, [fullName, email]);
    return (
        <div className={`flex flex-col  gap-[0.5rem] ${className}`} {...props}>
            <div>
                <UsernameInput value={fullName} handleChange={(e) => { setFullName(e.target.value) }}></UsernameInput>
            </div>
            <div>
                <EmailInput value={email} handleChange={(e) => { setEmail(e.target.value) }}></EmailInput>
            </div>

        </div>
    );
}
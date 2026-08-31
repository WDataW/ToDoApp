import { useEffect, useState } from "react";
import { EmailInput, UsernameInput } from "../keyboardInputs";

export default function UserInit({ info, setInfo, className = "", children, ...props }) {
    const [fullName, setFullName] = useState(info.name);
    const [email, setEmail] = useState(info.email);
    console.log(info);
    return (
        <div className={`flex flex-col  gap-[0.5rem] ${className}`} {...props}>
            <div>
                <EmailInput className={"opacity-50"} value={email} disabled handleChange={(e) => { setEmail(e.target.value) }}></EmailInput>
            </div>
            <div>
                <UsernameInput value={fullName} handleChange={(e) => { setFullName(e.target.value) }}></UsernameInput>
            </div>

        </div>
    );
}
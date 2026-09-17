import { useState } from "react";
import { EmailInput, UsernameInput } from "../keyboardInputs";

export default function UserInit({ name, setName, info, className = "", children, ...props }) {
    const [email, setEmail] = useState(info.email);
    return (
        <div className={`flex flex-col  gap-[0.5rem] ${className}`} {...props}>
            <div>
                <EmailInput className={"opacity-50"} value={email} disabled ></EmailInput>
            </div>
            <div>
                <UsernameInput value={name} handleChange={(e) => { setName(e.target.value) }}></UsernameInput>
            </div>

        </div>
    );
}
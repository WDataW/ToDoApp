import KeyboardInput from "./KeyboardInput";
export default function EmailInput({handleChange, value, placeholder="Enter your email"}){
    return(
        <KeyboardInput 
            type="email"
            label="Email"
            placeholder={placeholder}
            handleChange={handleChange}
            lightIcon="src/assets/icons/light/email.svg"
            darkIcon="src/assets/icons/dark/email.svg"
            alt="Mail Icon"
            className="mb-[0.5rem]"
            required={true}
            value={value}
        />
    );
}
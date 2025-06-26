import KeyboardInput from "./KeyboardInput";
export default function PasswordInput({handleChange, label="Password", className, placeholder="Enter your password", value}){
    return(
        <KeyboardInput
            type="password"
            label={label}
            placeholder={placeholder}
            handleChange={handleChange}
            lightIcon="src/assets/icons/light/key.svg"
            darkIcon="src/assets/icons/dark/key.svg"
            alt="Door Key Icon"
            className={className}
            required={true}
            value={value}
        />
    );
}
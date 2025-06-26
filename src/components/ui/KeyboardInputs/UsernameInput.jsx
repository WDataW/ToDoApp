import KeyboardInput from "./KeyboardInput";
export default function UsernameInput({handleChange, value, placeholder="Enter your username"}){
    return(
        <KeyboardInput 
            type="text"
            autocomplete="username"
            label="Username"
            placeholder={placeholder}
            handleChange={handleChange}
            lightIcon="src/assets/icons/light/user.svg"
            darkIcon="src/assets/icons/dark/user.svg"
            alt="User Icon"
            className="mb-[0.65rem]"
            required={true}
            value={value}
        />
    );
}
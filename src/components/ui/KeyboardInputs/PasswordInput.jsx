import KeyboardInput from "./KeyboardInput.jsx";
export default function PasswordInput({handleChange}){
    return(
        <KeyboardInput
            type="password"
            placeholder="Password"
            handleChange={handleChange}
            lightIcon="src/assets/icons/light/key.svg"
            darkIcon="src/assets/icons/dark/key.svg"
            alt="Door Key Icon"
        />
    );
}
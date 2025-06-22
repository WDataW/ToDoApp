import KeyboardInput from "./KeyboardInput";
export default function UsernameInput({handleChange}){
    return(
        <KeyboardInput 
            type="text"
            placeholder="Username"
            handleChange={handleChange}
            lightIcon="src/assets/icons/light/user.svg"
            darkIcon="src/assets/icons/dark/user.svg"
            alt="User Icon"
        />
    );
}
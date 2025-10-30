import { getIcon } from "@/assets/assetsHandler";
import KeyboardInput from "./KeyboardInput";

export default function SearchInput({ className = "", children, ...props }) {
    return (
        <KeyboardInput className={`${className}`}
            lightIcon={getIcon("/src/assets/icons/light/search.svg")}
            darkIcon={getIcon("/src/assets/icons/dark/search.svg")}
            {...props}>
            {children}
        </KeyboardInput>
    );
}
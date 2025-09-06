import { paddingX } from "../LandingPage";
import Discord from "./Discord";
import Github from "./Github";
export default function FooterSection({ className = "", children, ...props }) {
    return (
        <footer className={`${paddingX} py-[1rem] ${className}`} {...props}>
            <div className=" flex items-center justify-between">
                <Github className="h-[4rem] w-[4rem]" />
                <Discord className="h-[4rem] w-[4rem] bg-size-[85%]" />
            </div>
        </footer>
    );
}
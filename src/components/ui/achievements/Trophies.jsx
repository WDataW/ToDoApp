import Trophy from "./Trophy";
import { useGeneratedTrophies } from "../tasks/tasks";
export default function Trophies({ className = "", children, ...props }) {
    const trophies = useGeneratedTrophies();
    return (
        <ul className={`${className} mx-[0.4rem] pb-[0.4rem] sm:pb-0 flex justify-start gap-[1rem] overflow-x-auto`} {...props}>
            {trophies.map((trophy, i) => { return <li key={i}> <Trophy trophy={trophy} /></li> })}
            {trophies.length == 0 && <li key={0}> <h4>{t("terms.noAchsAvailable")}</h4></li>}
        </ul>
    );
}
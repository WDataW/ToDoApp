import { trophyThemes, useGeneratedTrophies } from "../tasks/tasks";
import Goal from "./Goal";
export default function Goals({ className = "", children, ...props }) {
    const trophies = useGeneratedTrophies();
    const goals = trophies.map((trophy) => {
        if (trophy.nextGoal == -1) return -1;
        return {
            titleKey: trophy.titleKey,
            currentCount: trophy.currentCount,
            goalCount: trophy.nextGoal,
            level: trophy.level + 1,
            description: trophy.nextGoalDescription,
            theme: trophyThemes[trophy.level + 1],
        }

    }).filter((goal) => goal !== -1);
    return (
        <ul className={`${className} mx-[0.4rem] pb-[0.4rem] sm:pb-0 flex justify-start gap-[1rem] overflow-x-auto`} {...props}>
            {goals.map((goal, i) => <Goal key={i} goal={goal} />)}
        </ul>
    );
}
import { createContext, useContext, useEffect, useState } from "react";
import { sortTasksByDate } from "../components/ui/Tasks/tasks";
import userData from "/src/assets/user.json";
const UserInfoContext = createContext();
const UserTasksContext = createContext();
const UserAchievementsContext = createContext();
const UserInboxContext = createContext();
export function useInfo() {
    return useContext(UserInfoContext);
}
export function useTasks() {
    return useContext(UserTasksContext);
}
export function useInbox() {
    return useContext(UserInboxContext);
}
export function useAchievements() {
    return useContext(UserAchievementsContext);
}


export default function User({ children }) {
    const [infoState, setInfoState] = useState(userData.info);
    const [tasksState, setTasksState] = useState(sortTasksByDate(userData.tasks));
    const [achievmentsState, setAchievmentsState] = useState(userData.achievements);
    const [inboxState, setInboxState] = useState(userData.inbox);
    return (
        <UserInfoContext value={[infoState, setInfoState]}>
            <UserTasksContext value={[tasksState, setTasksState]}>
                <UserAchievementsContext value={[achievmentsState, setAchievmentsState]}>
                    <UserInboxContext value={[inboxState, setInboxState]}>
                        {children}
                    </UserInboxContext>
                </UserAchievementsContext>
            </UserTasksContext>
        </UserInfoContext>
    );
}
import { createContext, useContext, useEffect, useState } from "react";
import { sortTasksByDate } from "../components/ui/Tasks/tasks";
import userJSON from "/src/assets/user.json";
import { sortInbox } from "@/components/ui/inbox/mail";
import { getTags, getTasks, getUserInfo, isLogged } from "@/scripts/requests";
import { useNavigate } from "react-router-dom";
const UserInfoContext = createContext();
const UserTasksContext = createContext();
const UserInboxContext = createContext();
const UserTagsContext = createContext();
export function useInfo() {
    return useContext(UserInfoContext);
}
export function useTasks() {
    return useContext(UserTasksContext);
}
export function useInbox() {
    return useContext(UserInboxContext);
}
export function useTags() {
    return useContext(UserTagsContext);
}

export default function User({ children }) {
    const [infoState, setInfoState] = useState({});
    const [tasksState, setTasksState] = useState(sortTasksByDate([]));
    const [inboxState, setInboxState] = useState(sortInbox([]));
    const [tagsState, setTagsState] = useState([]);
    return (
        <UserInfoContext value={[infoState, setInfoState]}>
            <UserTasksContext value={[tasksState, setTasksState]}>
                <UserInboxContext value={[inboxState, setInboxState]}>
                    <UserTagsContext value={[tagsState, setTagsState]}>
                        {children}
                    </UserTagsContext>
                </UserInboxContext>
            </UserTasksContext>
        </UserInfoContext>
    );
}
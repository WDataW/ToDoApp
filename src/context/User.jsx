import { createContext, useContext, useEffect, useState } from "react";
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
    const [tasksState, setTasksState] = useState([]);
    const [inboxState, setInboxState] = useState([]);
    console.log(infoState.settings);
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
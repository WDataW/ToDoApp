import { createContext, useContext, useState } from "react";

const PageLevelContext = createContext();
export function useLevel() {
    return useContext(PageLevelContext);
}
export default function PageLevel({ children }) {
    const [level, setLevel] = useState(0);
    console.log(level);
    return (
        <PageLevelContext value={[level, setLevel]}>
            {children}
        </PageLevelContext>
    );
}
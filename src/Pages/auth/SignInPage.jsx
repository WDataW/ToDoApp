import { EmailInput, PasswordInput, SignInButton, GuestModeButton, CheckboxInput, ThemedAnchor, ErrorMessage, WarningMessage } from "../../components/ui";
import { useTheme } from "../../context/Theme";
import { useContext, useEffect, useState } from "react";
import { commonStyles } from "./commonStyles";
import Page from "../Page";
import { useTranslation } from "../../context/Language";
import { useScreenWidth } from "@/context/ScreenSize";
import { appName } from "@/App";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { getTags, getTasks, getUserInfo, login } from "@/scripts/requests";
import { useInfo, useTags, useTasks } from "@/context/User";
import validator from 'validator'
const styles = commonStyles;

export default function SignInPage({ children }) {
    const [theme] = useTheme();
    const t = useTranslation();
    function handleEmailChange(e) {
        setUserInfo({
            ...userInfo,
            email: e.target.value
        });
    }
    function handlePasswordChange(e) {
        setUserInfo({
            ...userInfo,
            password: e.target.value
        });
    }
    const [searchParams] = useSearchParams();
    const initialEmail = searchParams.get("email") || "";
    const [userInfo, setUserInfo] = useState({
        email: initialEmail,
        password: ""
    })
    const [isSuccesful, setIsSuccessful] = useState();

    const navigate = useNavigate();
    const [infoState, setInfoState] = useInfo();
    const [tagsState, setTagsState] = useTags();
    const [tasksState, setTasksState] = useTasks();
    const loginHandler = async (e) => {
        e.preventDefault();
        setUserInfo({ ...userInfo, password: "" });
        const response = await login(userInfo);
        if (response) setIsSuccessful(response.status == 200);
        else {
            setIsSuccessful(false);
            return;
        }
        // load user data
        loadUser();
        navigate('/app/home');
    }
    const loadUser = async () => {
        const storedInfo = await getUserInfo();
        const storedTags = await getTags();
        const storedTasks = await getTasks();
        setInfoState(storedInfo);
        setTagsState(storedTags);
        setTasksState(storedTasks);
    }

    const w = useScreenWidth();
    return (
        <Page className={styles["page"]}>
            <div className={`frosted-glass p-[1.5rem] rounded-[0.5rem] md:text-white w-full max-w-[25rem] `}>
                <h1 className="leading-none">
                    {appName}
                </h1>
                <p className="text-center opacity-70 mb-[2rem]">*{t("titles.signIn")}*</p>
                <form method="POST" onSubmit={loginHandler}>
                    <EmailInput value={userInfo.email} customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} handleChange={handleEmailChange} />
                    <WarningMessage className="ms-[0.2rem] mb-[0.5rem]">{userInfo.email !== '' && !validator.isEmail(userInfo.email) && t("errors.invalidEmail")}</WarningMessage>
                    <PasswordInput value={userInfo.password} customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} handleChange={handlePasswordChange} />
                    <div className="mt-[0.5rem]">
                        <CheckboxInput className="h-[1rem] w-[1rem] align-middle">{t("fields.rememberMe")}</CheckboxInput>
                    </div>
                    <SignInButton customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} className="mt-[1.5rem] mb-[.1rem]" disabled={!userInfo["password"] || !userInfo["email"] || !validator.isEmail(userInfo.email)} />
                </form>
                {/* <Link to="/app/home">
                    <GuestModeButton customTheme={`auth${theme}`} customIcon={w >= 768 && "dark"} className="mt-[0.5rem] mb-[.1rem]" />
                </Link> */}
                {isSuccesful == false && <ErrorMessage className={'ps-[0.1rem]'}>{t("errors.invalidEmailPassword")}</ErrorMessage>}
                <Link to={`/auth/forgot-password?email=${userInfo.email}`} href={null} className="text-[0.8rem] opacity-50 ">{t("titles.forgotPassword")}</Link>
                <p className="text-[0.8rem] opacity-70 text-center mt-[0.75rem]">{t("terms.dontHaveAnAccount")} <ThemedAnchor to="/auth/sign-up">{t("titles.signUp")}</ThemedAnchor></p>
                {children}
            </div>
        </Page>
    );
}
import { broadcastError } from '@/ErrorHandler';
import axios from 'axios';

const BASE_URL = import.meta.env.DEV ? "/api/v1" : "https://api.domores.nerdos.site/api/v1";
const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
});
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error?.config?.isSilent) {
            broadcastError({ message: error?.response?.data?.message });
        }
        return Promise.reject(error);
    }
);

export const login = async ({ email, password }) => {
    const response = await api.post(`/auth/login`, {
        email, password
    });
    return response;
}
export const deleteAccountAndData = async (password) => {
    const response = await api.post(`/account/delete-account`, {
        password
    });
    (response);
    return response;
}
export const getUserInfo = async () => {
    const { fullname, createdAt, email, highestLogInStreak, currentLogInStreak, lastLogIn } = await getUser();
    const { signedUrl } = await getPFP();
    const settings = await getSettings();
    const info = {
        email,
        name: fullname,
        pfp: signedUrl || "/images/defaultPFP.png",
        createdAt,
        highestLogInStreak, currentLogInStreak, lastLogIn,
        settings
    }
    return info;
}

const getUser = async () => {
    const response = await api.get(`/auth/showMe`);
    return response.data;
}

export const getTasks = async () => {
    const response = await api.get(`/tasks`);
    return response.data;
}
export const getSettings = async () => {
    const response = await api.get(`/account/settings`);
    return response.data;
}
export const getTags = async () => {
    const response = await api.get(`/tags`);
    return response.data;
}
export const getPFP = async () => {
    const response = await api.get(`/account/pfp`);
    return response.data;
}
export const setPFP = async (formData) => {
    const response = await api.post(`/account/pfp`, formData);
    return response.data;
}
export const updateName = async (newName) => {
    const response = await api.patch(`/account/name`, { name: newName });
    return response.data;
}
export const setLanguage = async (language) => {
    const response = await api.patch(`/account/settings`, { language });
    return response.data;
}
export const setThemeSetting = async ({ base, lightAccentColor, lightSecondaryColor, darkAccentColor, darkSecondaryColor }) => {
    const response = await api.patch(`/account/settings`, { theme: { base, lightAccentColor, lightSecondaryColor, darkAccentColor, darkSecondaryColor } });
    if (response && response.status == 200) return response.data;
}

export const isLogged = async () => {
    try {
        const response = await api.get(`/auth/showMe`, { isSilent: true });
        if (response && response.status == 200) return true;
    } catch (error) { return false; }
}

export const getInbox = async () => {
    const response = await api.get(`/account/inbox`);
    return response.data;
}

export const resendVerificationEmail = async (email) => {
    const response = await api.post(`/auth/resend-verification-email`, { email });
    return response.data;
}
export const signUp = (newUser) => {
    return api.post(`/auth/register`, newUser)
}
export const verifyEmail = (email, code) => {
    return api.post(`/auth/verify-email`, { email, code })
}
export const forgotPassword = (email) => {
    return api.post(`/auth/forgot-password`, { email })
}
export const resetPassword = (email, resetToken, newPassword) => {
    return api.post(`/auth/reset-password`, { email, resetToken, newPassword })
}
export const logOut = () => api.post(`/auth/logout`);

export const createTask = async (newTask) => {
    const createdTask = await api.put(`/tasks/create-task`, newTask);
    return createdTask;
}
export const readMessage = async ({ messageId, from }) => {
    const response = await api.patch(`/account/inbox/read/${messageId}`, { from });
    return response.data;
}
export const patchTask = async (taskToEdit) => {
    const editedTask = await api.patch(`/tasks/${taskToEdit.id}`, taskToEdit);
    return editedTask;
}
export const createTag = async (newTag) => {
    const createdTag = await api.put(`/tags/create-tag`, newTag);
    return createdTag;
}
export const patchTag = async (tagToEdit) => {
    const editedTag = await api.patch(`/tags/${tagToEdit.id}`, tagToEdit);
    return editedTag;

}
export const eraseTag = (tagToDelete) => {
    return api.delete(`/tags/${tagToDelete.id}`);
}
export const eraseTask = (taskToDelete) => {
    return api.delete(`/tasks/${taskToDelete.id}`);
}


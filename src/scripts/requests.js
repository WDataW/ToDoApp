import { broadcastError } from '@/ErrorHandler';
import axios from 'axios';
const api = axios.create();
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
    const response = await api.post('/api/v1/auth/login', {
        email, password
    });
    return response;
}
export const deleteAccountAndData = async (password) => {
    const response = await api.post('/api/v1/account/delete-account', {
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
    const response = await api.get('/api/v1/auth/showMe');
    return response.data;
}

export const getTasks = async () => {
    const response = await api.get('/api/v1/tasks');
    return response.data;
}
export const getSettings = async () => {
    const response = await api.get('/api/v1/account/settings');
    return response.data;
}
export const getTags = async () => {
    const response = await api.get('/api/v1/tags');
    return response.data;
}
export const getPFP = async () => {
    const response = await api.get('/api/v1/account/pfp');
    return response.data;
}
export const setPFP = async (formData) => {
    const response = await api.post('/api/v1/account/pfp', formData);
    return response.data;
}
export const updateName = async (newName) => {
    const response = await api.patch('/api/v1/account/name', { name: newName });
    return response.data;
}
export const setLanguage = async (language) => {
    const response = await api.patch('/api/v1/account/settings', { language });
    return response.data;
}
export const setThemeSetting = async ({ base, lightAccentColor, lightSecondaryColor, darkAccentColor, darkSecondaryColor }) => {
    const response = await api.patch('/api/v1/account/settings', { theme: { base, lightAccentColor, lightSecondaryColor, darkAccentColor, darkSecondaryColor } });
    if (response && response.status == 200) return response.data;
}

export const isLogged = async () => {
    const response = await api.get('/api/v1/auth/showMe', { isSilent: true });
    if (response && response.status == 200) return true;
    else return false;
}

export const getInbox = async () => {
    const response = await api.get('/api/v1/account/inbox');
    return response.data;
}

export const resendVerificationEmail = async (email) => {
    const response = await api.post(`/api/v1/auth/resend-verification-email`, { email });
    return response.data;
}
export const signUp = (newUser) => {
    return api.post('/api/v1/auth/register', newUser)
}
export const verifyEmail = (email, code) => {
    return api.post('/api/v1/auth/verify-email', { email, code })
}
export const forgotPassword = (email) => {
    return api.post('/api/v1/auth/forgot-password', { email })
}
export const resetPassword = (email, resetToken, newPassword) => {
    return api.post('/api/v1/auth/reset-password', { email, resetToken, newPassword })
}
export const logOut = () => api.post('/api/v1/auth/logout');

export const createTask = async (newTask) => {
    const createdTask = await api.put('/api/v1/tasks/create-task', newTask);
    return createdTask;
}
export const readMessage = async ({ messageId, from }) => {
    const response = await api.patch(`/api/v1/account/inbox/read/${messageId}`, { from });
    return response.data;
}
export const patchTask = async (taskToEdit) => {
    const editedTask = await api.patch(`/api/v1/tasks/${taskToEdit.id}`, taskToEdit);
    return editedTask;
}
export const createTag = async (newTag) => {
    const createdTag = await api.put('/api/v1/tags/create-tag', newTag);
    return createdTag;
}
export const patchTag = async (tagToEdit) => {
    const editedTag = await api.patch(`/api/v1/tags/${tagToEdit.id}`, tagToEdit);
    return editedTag;

}
export const eraseTag = (tagToDelete) => {
    return api.delete(`/api/v1/tags/${tagToDelete.id}`);
}
export const eraseTask = (taskToDelete) => {
    return api.delete(`/api/v1/tasks/${taskToDelete.id}`);
}


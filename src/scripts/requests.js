import axios from 'axios';
export const login = async ({ email, password }) => {
    try {
        const response = await axios.post('/api/v1/auth/login', {
            email, password
        });
        (response);
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const getUserInfo = async () => {
    const { fullname, createdAt, email } = await getUser();
    const { signedUrl } = await getPFP();
    const settings = await getSettings();
    const info = {
        email,
        name: fullname,
        pfp: signedUrl || "/images/defaultPFP.png",
        createdAt,
        settings
    }
    return info;
}

const getUser = async () => {
    try {
        const response = await axios.get('/api/v1/auth/showMe');
        if (response && response.status == 200) return response.data;
        throw new Error('Failed to GET user');
    } catch (error) {
        console.log(error)
    }
}

export const getTasks = async () => {
    try {
        const response = await axios.get('/api/v1/tasks');
        if (response && response.status == 200) return response.data;
        throw new Error('Failed to GET tasks');
    } catch (error) {
        console.log(error)
    }
}
export const getSettings = async () => {
    try {
        const response = await axios.get('/api/v1/account/settings');
        if (response && response.status == 200) return response.data;
        throw new Error('Failed to GET settings');
    } catch (error) {
        console.log(error)
    }
}
export const getTags = async () => {
    try {
        const response = await axios.get('/api/v1/tags');
        if (response && response.status == 200) return response.data;
        throw new Error('Failed to GET tags');
    } catch (error) {
        console.log(error)
    }
}
export const getPFP = async () => {
    try {
        const response = await axios.get('/api/v1/account/pfp');
        if (response && response.status == 200) return response.data;
    } catch (error) {
        console.log(error)
    }
}
export const setPFP = async (formData) => {
    try {
        const response = await axios.post('/api/v1/account/pfp', formData);
        if (response && response.status == 200) return response.data;
    } catch (error) {
        console.log(error)
    }
}
export const setLanguage = async (language) => {
    try {
        const response = await axios.patch('/api/v1/account/settings', { language });
        if (response && response.status == 200) return response.data;
    } catch (error) {
        console.log(error)
    }
}
export const setThemeSetting = async ({ base, lightAccentColor, lightSecondaryColor, darkAccentColor, darkSecondaryColor }) => {
    try {
        const response = await axios.patch('/api/v1/account/settings', { theme: { base, lightAccentColor, lightSecondaryColor, darkAccentColor, darkSecondaryColor } });
        if (response && response.status == 200) return response.data;
    } catch (error) {
        console.log(error)
    }
}

export const isLogged = async () => {
    try {
        const response = await axios.get('/api/v1/auth/showMe');
        if (response && response.status == 200) return true;
        else return false;
    } catch (error) {
        console.log(error)
    }
}
export const signUp = (newUser) => {
    return axios.post('/api/v1/auth/register', newUser)
}
export const verifyEmail = (email, code) => {
    return axios.post('/api/v1/auth/verify-email', { email, code })
}
export const forgotPassword = (email) => {
    return axios.post('/api/v1/auth/forgot-password', { email })
}
export const resetPassword = (email, resetToken, newPassword) => {
    return axios.post('/api/v1/auth/reset-password', { email, resetToken, newPassword })
}
export const logOut = () => axios.post('/api/v1/auth/logout');

export const createTask = async (newTask) => {
    const createdTask = await axios.put('/api/v1/tasks/create-task', newTask);
    return createdTask;
}
export const patchTask = async (taskToEdit) => {
    const editedTask = await axios.patch(`/api/v1/tasks/${taskToEdit.id}`, taskToEdit);
    return editedTask;
}
export const createTag = async (newTag) => {
    const createdTag = await axios.put('/api/v1/tags/create-tag', newTag);
    return createdTag;
}
export const patchTag = async (tagToEdit) => {
    const editedTag = await axios.patch(`/api/v1/tags/${tagToEdit.id}`, tagToEdit);
    return editedTag;

}
export const eraseTag = (tagToDelete) => {
    return axios.delete(`/api/v1/tags/${tagToDelete.id}`);
}
export const eraseTask = (taskToDelete) => {
    return axios.delete(`/api/v1/tasks/${taskToDelete.id}`);
}


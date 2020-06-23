import {LOGIN_URL, REGISTER_URL, GET_USER_INFO_URL, LIST_USER_URL, CREATE_USER_URL, UPDATE_DELETE_USER_URL, LIST_ROLES_USER_URL, LIST_PERMISSION_USER_URL} from "constants/global";
import services from "services";

export const login = async (username, password) => {
    return await services.post(LOGIN_URL, {
        username,
        password
    });
}
export const register = async (fullName, username, password, confirmPassword) => {
    return await services.post(REGISTER_URL, {
        fullName,
        username,
        password,
        confirmPassword
    });
}

export const getUserInfo = async () => {
    return await services.get(GET_USER_INFO_URL);
}

export const fetchListUser = async (keyword, isVip, skip, limit) => {
    return await services.get(LIST_USER_URL, {
        params: {
            keyword,
            isVip,
            skip,
            limit
        }
    });
}

export const createUser = async (fullName, username, password, confirmPassword, avatar, isVip, vipExpiredTime) => {
    return await services.post(CREATE_USER_URL, {
        fullName,
        username,
        password,
        confirmPassword,
        avatar,
        isVip,
        vipExpiredTime
    });
}

export const updateUser = async (userId, fullName, avatar, isVip, vipExpiredTime, newPassword) => {
    return await services.put(UPDATE_DELETE_USER_URL.replace(':id', userId), {
        fullName,
        avatar,
        isVip,
        vipExpiredTime,
        newPassword
    });
}

export const deleteUser = async (userId) => {
    return await services.delete(UPDATE_DELETE_USER_URL.replace(':id', userId));
}

export const fetchListRoles = async (skip, limit) => {
    return await services.get(LIST_ROLES_USER_URL, {
        params: {
            skip,
            limit
        }
    })
}

export const fetchListPermission = async (skip, limit) => {
    return await services.get(LIST_PERMISSION_USER_URL, {
        params: {
            skip,
            limit
        }
    })
}
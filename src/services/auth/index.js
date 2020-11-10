import {LOGIN_URL, REGISTER_URL, GET_USER_INFO_URL, LIST_USER_URL, CREATE_USER_URL, UPDATE_USER_URL, DELETE_USER_URL, LIST_ROLES_USER_URL, LIST_PERMISSION_USER_URL, UPDATE_ROLE_URL, DELETE_ROLE_URL, CREATE_ROLE_URL, UPDATE_USERROLE_URL, LOGOUT_URL, CHANGE_PWD_URL} from "constants/global";
import services from "services";

export const login = async (username, password) => {
    return await services.post(LOGIN_URL, {
        username: username,
        pwd: password
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

export const fetchListUser = async (keyword ,start, limit) => {
    return await services.get(LIST_USER_URL, {
        params: {
            keyword,
            start,
            limit
        }
    });
}

export const createUser = async (fullName, username, password) => {
    return await services.post(CREATE_USER_URL, {
        fullName,
        username,
        pwd: password,
    });
}

export const updateUser = async (userId, fullName, newPassword) => {
    return await services.put(UPDATE_USER_URL, {
        userId,
        fullName,
        newPassword
    });
}

export const updateUserRole = async (userId, roleId) => {
    return await services.put(UPDATE_USERROLE_URL, {
        userId,
        roleId
    });
}

export const deleteUser = async (userId) => {
    return await services.post(DELETE_USER_URL, {userId});
}

export const fetchListRoles = async (skip, limit) => {
    return await services.get(LIST_ROLES_USER_URL, {
        params: {
            skip,
            limit
        }
    })
}

export const createRole = async (description, permissionCodes) => {
    return await services.post(CREATE_ROLE_URL, {
        description,
        permissionCodes
    });
}

export const updateRole = async (roleId, description, permissionCodes) => {
    return await services.put(UPDATE_ROLE_URL, {
        id: roleId,
        description,
        permissionCodes
    });
}

export const deleteRole = async (roleId) => {
    let body = {roleId};
    return await services.post(DELETE_ROLE_URL, body);
}

export const fetchListPermission = async (skip, limit) => {
    return await services.get(LIST_PERMISSION_USER_URL, {
        params: {
            skip,
            limit
        }
    })
}

export const logout = async () => {
    return await services.post(LOGOUT_URL);
}

export const changePassword = async (oldPassword, newPassword) => {
    let body = {
        oldPassword: oldPassword,
        newPassword: newPassword,
    };
    return await services.put(CHANGE_PWD_URL, body);
}
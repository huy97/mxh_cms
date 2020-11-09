export const LOGIN_START = "LOGIN_START";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const REGISTER_START = "REGISTER_START";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const RESTORE_TOKEN = "RESTORE_TOKEN";
export const LOGOUT_START= "LOGOUT_START";
export const LOGOUT_SUCCESS= "LOGOUT_SUCCESS";

export const login = (username, password) => {
    return {
        type: LOGIN_START,
        payload: {
            username,
            password
        }
    }
}

export const logout = () => {
    return {
        type: LOGOUT_START,
    }
}

export const register = (fullName, username, password, confirmPassword) => {
    return {
        type: REGISTER_START,
        payload: {
            fullName,
            username,
            password,
            confirmPassword
        }
    }
}

export const restoreToken = () => {
    return {
        type: RESTORE_TOKEN
    }
}

const inititalState = {
    isLoggedIn: false,
    isRestoreToken: true,
    userInfo: {},
    errors: []
};

const authReducer = (state = inititalState, action) => {
    switch(action.type){
        case REGISTER_START:
            return state;
        case LOGIN_START:
            return state;
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            state.isLoggedIn = true;
            state.isRestoreToken = false;
            state.userInfo = action.payload.userInfo;
            state.errors = [];
            return {
                ...state
            }
        case LOGIN_FAILURE:
            state.isLoggedIn = false;
            state.isRestoreToken = false;
            state.userInfo = null;
            return {
                ...state,
                errors: action.errors
            };
        case RESTORE_TOKEN:
            return {
                ...state
            };
        case LOGOUT_SUCCESS:
            state.isLoggedIn = false;
            state.isRestoreToken = false;
            state.userInfo = null;
            return {
                ...state,
            };
        default:
            return state;
    }
}

export default authReducer;

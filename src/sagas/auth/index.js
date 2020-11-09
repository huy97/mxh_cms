import {takeEvery, takeLatest, call, put} from "@redux-saga/core/effects";
import {LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE, REGISTER_START, REGISTER_SUCCESS, RESTORE_TOKEN, LOGOUT_START, LOGOUT_SUCCESS} from "reducers/auth";
import {login, register, getUserInfo, logout} from "services/auth";
import {setUserToken, removeUserToken, toast} from "utils";

function* handleLogin(action) {
    const {username, password} = action.payload;
    try{
        const loginResult = yield call(login, username, password);
        yield call(setUserToken, loginResult.accessToken);
        const userInfoResult = yield call(getUserInfo);
        yield put({type: LOGIN_SUCCESS, payload: {
            userInfo: userInfoResult.data
            }});
    }catch (e) {
        yield call(removeUserToken);
        yield put({type: LOGIN_FAILURE, errors: e.errors || []});
        if(e.message){
            yield call(toast.error, e.message);
        }
    }
}

function* handleRegister(action) {
    const {fullName, username, password, confirmPassword} = action.payload;
    try{
        const registerResult = yield call(register, fullName, username, password, confirmPassword);
        yield call(setUserToken, registerResult.data.accessToken);
        yield call(toast.success, registerResult.message);
        yield put({type: REGISTER_SUCCESS, payload: {
            userInfo: registerResult.data
        }});
    }catch (e) {
        yield call(removeUserToken);
        yield put({type: LOGIN_FAILURE, errors: e.errors || []});
        if(e.message){
            yield call(toast.error, e.message);
        }
    }
}

function* restoreToken() {
    try{
        
        const userInfoResult = yield call(getUserInfo);
        yield put({type: LOGIN_SUCCESS, payload: {
            userInfo: userInfoResult.data
        }});
    }catch (e) {
        yield call(removeUserToken);
        yield put({type: LOGIN_FAILURE});
    }
}

function* handleLogout() {
    try {
        yield call(logout);
        yield call(removeUserToken);
        yield put({type: LOGOUT_SUCCESS});
    
    } catch(e) {
        yield call(removeUserToken);
        yield put({type: LOGOUT_SUCCESS});
    }
}

function* watchLogin() {
    yield takeEvery(LOGIN_START, handleLogin);
    yield takeEvery(REGISTER_START, handleRegister);
    yield takeLatest(RESTORE_TOKEN, restoreToken);
    yield takeLatest(LOGOUT_START, handleLogout)
}

export default watchLogin;

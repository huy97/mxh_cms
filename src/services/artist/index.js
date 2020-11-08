import services from "services";
import { LIST_END_USER_URL,  TOOGLE_LOCK_USER_URL } from "constants/global";

export const fetchListUser = async (keyword, skip, limit) => {
    let link = `${LIST_END_USER_URL}?start=${skip}&limit=${limit}&keyword=${keyword}` 
    return await services.get(link);
};

export const toogleLockUser = async (id, lockStatus) => {
    let body = {
        id: id,
        setLock: lockStatus,
    }
    return await services.put(TOOGLE_LOCK_USER_URL, body);
}
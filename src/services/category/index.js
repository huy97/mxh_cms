import services from "services";
import { LIST_POST_URL, TOGGLE_POST_URL } from "constants/global";

export const fetchListPost = async (skip, limit) => {
    let link = `${LIST_POST_URL}?start=${skip}&limit=${limit}`
    return await services.get(link);
};

export const togglePost = async (id, isShow) => {
    let body = {
        postId: id,
        isShow: isShow,
    };
    return await services.put(TOGGLE_POST_URL, body);
}
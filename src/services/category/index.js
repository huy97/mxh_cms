import services from "services";
import { LIST_POST_URL, CREATE_CATEGORY_URL, UPDATE_DELETE_CATEGORY_URL } from "constants/global";

export const fetchListPost = async (skip, limit) => {
    let link = `${LIST_POST_URL}?start=${skip}&limit=${limit}`
    return await services.get(link);
};

export const createCategory = async (data) => {
    return await services.post(CREATE_CATEGORY_URL, data);
}

export const updateCategory = async (categoryId, data) => {
    return await services.put(UPDATE_DELETE_CATEGORY_URL.replace(':id', categoryId), data);
}

export const deleteCategory = async (categoryId) => {
    return await services.delete(UPDATE_DELETE_CATEGORY_URL.replace(':id', categoryId));
}
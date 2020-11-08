import services from "services";
import { LIST_VERSION_URL, CREATE_VERSION, DELETE_VERSION, UPDATE_VERSION } from "constants/global";

export const fetchListVesion = async (os, skip, limit) => {
    let link = `${LIST_VERSION_URL}?os=${os}&start=${skip}&limit=${limit}`
    return await services.get(link);
};

export const createVersion = async (data) => {
    return await services.post(CREATE_VERSION, data);
}

export const updateVersion = async (data) => {
    return await services.put(UPDATE_VERSION, data);
}
export const deleteVersion = async (versionId) => {
    return await services.post(DELETE_VERSION, {id: versionId});
}

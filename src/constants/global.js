export const PERMISSION_CODE = {
    READ: "READ",
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    MANAGER: "MANAGER"
}

export const OLD_PASSWORD_MANAGER = "OLD_PASSWORD_MANAGER";

export const MEDIA_TYPE = {
    AUDIO: "AUDIO",
    VIDEO: "VIDEO",
    IMAGE: "IMAGE",
    OTHER: "OTHER",
};

export const SONG_STATUS = {
    PRIVATE: 0,
    ACTIVE: 1,
    PENDING: 2
};

export const REPEAT_TYPE = {
    REPEAT_OFF: 0,
    REPEAT_ONE: 1,
    REPEAT_ALL: 2
}

export const API_URL = 'http://localhost:3000/';
export const CDN_URL = 'http://localhost:8686/cdn/';
export const LOGIN_URL = '/v2/admin/login';
export const LOGOUT_URL = '/v2/admin/logout';
export const REGISTER_URL = '/user/register';
export const GET_USER_INFO_URL = 'v2/admin/get-user-info';
export const CREATE_USER_URL = '/user/create-user';
export const UPDATE_DELETE_USER_URL = '/user/:id';
export const UPDATE_USERROLE_URL = '/user/:id/roles';
export const LIST_USER_URL = '/user/get-list-user';
export const LIST_ROLES_USER_URL = '/v2/admin/get-list-roles';
export const LIST_PERMISSION_USER_URL = '/v2/admin/get-list-permissions';
export const CREATE_ROLE_URL = '/v2/admin/role/create';
export const UPDATE_DELETE_ROLE_URL = '/v2/admin/role/update';
export const LIST_VERSION_URL = "/v2/admin/version/get";
export const CREATE_VERSION = "/v2/admin/version/create";
export const DELETE_VERSION = "/v2/admin/version/delete";
export const UPDATE_VERSION = "/v2/admin/version/edit";
export const CREATE_LYRIC_URL = "/song/lyric/create";
export const GET_LYRIC_URL = "/song/:id/lyrics";
export const UPDATE_DELETE_LYRIC_URL = "/song/lyric/:id";
export const LIST_END_USER_URL = "/v2/admin/get-list-end-user";
export const CREATE_ARTIST_URL = "/artist/create";
export const TOOGLE_LOCK_USER_URL = "/v2/admin/user/toogle-lock";
export const LIST_POST_URL = "/v2/admin/post/get";
export const CREATE_CATEGORY_URL = "/category/create";
export const TOGGLE_POST_URL = "/v2/admin/post/toggle";
export const UPLOAD_MEDIA = "/media/upload";

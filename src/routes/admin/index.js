import React from 'react';
import {RiHome2Line, RiListSettingsLine, RiUserLine, RiArticleLine, RiUserStarLine, RiShieldUserLine} from 'react-icons/ri';
import {PERMISSION_CODE} from "constants/global";

const Manager = React.lazy(() => import('containers/Manager'));
const Version = React.lazy(() => import('containers/Manager/Version'));
const Category = React.lazy(() => import('containers/Manager/Post'));
const EndUser = React.lazy(() => import('containers/Manager/EndUser'));
const Role = React.lazy(() => import('containers/Manager/Role'));
const User = React.lazy(() => import('containers/Manager/User'));

const routes = [
    {
        path: "/",
        title: "Trang chủ",
        isPrivate: true,
        icon: <RiHome2Line className="menu-icon"/>,
        roles: [PERMISSION_CODE.MANAGER, PERMISSION_CODE.READ],
        isAdmin: true,
        component: Manager
    },
    {
        path: "/manager/versions",
        title: "Quản lý version",
        icon: <RiListSettingsLine className="menu-icon"/>,
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER, PERMISSION_CODE.READ],
        isAdmin: true,
        component: Version
    },
    {
        path: "/manager/posts",
        title: "Quản lý bài viết",
        icon: <RiArticleLine className="menu-icon"/>,
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER, PERMISSION_CODE.READ],
        isAdmin: true,
        component: Category
    },
    {
        path: "/manager/endusers",
        title: "Quản lý người dùng cuối",
        icon: <RiUserStarLine className="menu-icon"/>,
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER, PERMISSION_CODE.READ],
        isAdmin: true,
        component: EndUser
    },
    {
        path: "/manager/role",
        title: "Quản lý phân quyền",
        icon: <RiShieldUserLine className="menu-icon"/>,
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER, PERMISSION_CODE.READ],
        isAdmin: true,
        component: Role
    },
    {
        path: "/manager/user",
        title: "Quản lý người dùng hệ thống",
        icon: <RiUserLine className="menu-icon"/>,
        isPrivate: true,
        roles: [PERMISSION_CODE.MANAGER, PERMISSION_CODE.READ],
        isAdmin: true,
        component: User
    }
];

export default routes;

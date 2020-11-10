import React, { Component } from "react";
import { Table, Button, Popconfirm, Tag, Tooltip } from "antd";
import PropTypes from "prop-types";
import { FiTrash, FiEdit3 } from "react-icons/fi";
import { QuestionCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import Ability from "containers/Ability";
import { PERMISSION_CODE } from "constants/global";
import { getRandomColor } from "utils";

export default class ListSong extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        onSelect: PropTypes.func,
        onSelectAll: PropTypes.func,
        onPaginate: PropTypes.func,
        onDelete: PropTypes.func,
        onEdit: PropTypes.func,
        pagination: PropTypes.object.isRequired,
    };

    static defaultProps = {
        data: [],
        onSelect: () => {},
        onSelectAll: () => {},
        onPaginate: () => {},
        onDelete: () => {},
        onEdit: () => {},
        pagination: {},
    };

    render() {
        const {
            data,
            onSelect,
            onSelectAll,
            onPaginate,
            pagination,
            onDelete,
            onEdit,
        } = this.props;
        const columns = [
            {
                title: "ID",
                dataIndex: "roleId",
                fixed: "left",
            },
            {
                title: "Mô tả",
                dataIndex: "description",
                render: (text, record) => <b>{text}</b>,
            },
            {
                title: "Quyền",
                dataIndex: "permissionCodes",
                render: (permissions) => permissions.map((permission, key) => <Tag color={getRandomColor()} key={key}>{permission}</Tag>),
            },
            {
                title: "Ngày tạo",
                dataIndex: "createdAt",
                render: (time) => moment(time).format("DD/MM/YYYY HH:mm"),
            },
            {
                title: "Hành động",
                fixed: "right",
                width: 100,
                render: (text, record) => {
                    let isShow = record.roleId > 6;
                    return !isShow ? null : (
                        <>
                            <Ability roles={[PERMISSION_CODE.MANAGER]}>
                                <Tooltip title="Sửa">
                                    <Button
                                        type="link"
                                        icon={<FiEdit3 />}
                                        onClick={(e) => onEdit(e, record)}
                                    />
                                </Tooltip>
                            </Ability>
                            <Ability roles={[PERMISSION_CODE.MANAGER]}>
                                <Popconfirm
                                    title="Xác nhận xoá quyền này?"
                                    placement="topLeft"
                                    okText="Xoá"
                                    cancelText="Huỷ"
                                    okType="danger"
                                    icon={
                                        <QuestionCircleOutlined
                                            style={{ color: "red" }}
                                        />
                                    }
                                    onConfirm={(e) => onDelete(e, record)}
                                >
                                    <Tooltip title="Xoá">
                                        <Button type="link" danger icon={<FiTrash />} />
                                    </Tooltip>
                                </Popconfirm>
                            </Ability>
                        </>
                    );
                },
            },
        ];
        return (
            <Table
                size="small"
                rowSelection={{
                    type: "checkbox",
                    onSelect: onSelect,
                    onSelectAll: onSelectAll,
                }}
                locale={{
                    emptyText: "Không có bản ghi nào",
                }}
                pagination={{
                    ...pagination,
                    size: "default",
                    showTotal: (total, range) => <span>Tổng: {total}</span>,
                    onChange: onPaginate,
                }}
                style={{ textAlign: "center" }}
                columns={columns}
                dataSource={data}
            />
        );
    }
}

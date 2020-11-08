import React, { Component } from "react";
import { Table, Button, Popconfirm,  Tooltip } from "antd";
import PropTypes from "prop-types";
import { QuestionCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import Ability from "containers/Ability";
import { PERMISSION_CODE } from "constants/global";
import { AiFillUnlock, AiFillLock } from "react-icons/ai";

export default class ListSong extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        onSelect: PropTypes.func,
        onSelectAll: PropTypes.func,
        onPaginate: PropTypes.func,
        onDelete: PropTypes.func,
        ocLock: PropTypes.func,
        pagination: PropTypes.object.isRequired,
    };

    static defaultProps = {
        data: [],
        onSelect: () => {},
        onSelectAll: () => {},
        onPaginate: () => {},
        onDelete: () => {},
        ocLock: () => {},
        pagination: {},
    };

    render() {
        const {
            data,
            onSelect,
            onSelectAll,
            onPaginate,
            pagination,
            ocLock,
        } = this.props;
        const columns = [
            {
                title: "ID",
                dataIndex: "shortCode",
                width: 120,
                fixed: "left",
            },
            {
                title: "Tên nghệ sĩ",
                dataIndex: "fullName",
                render: (text, record) => text,
            },
            
            {
                title: "Ảnh đại diện",
                dataIndex: "avatar",
                render: (avatar, record) => (
                    <img
                        width="50"
                        height="50"
                        alt="Ảnh bìa"
                        src={avatar}
                    />
                ),
            },
            {
                title: "Ảnh bìa",
                dataIndex: "cover",
                render: (cover, record) => (
                    <img
                        width="50"
                        height="50"
                        alt="Ảnh bìa"
                        src={cover}
                    />
                ),
            },
            {
                title: "Ngày tạo",
                dataIndex: "createdAt",
                render: (time) => moment(time).format("DD/MM/YYYY HH:mm"),
            },
            {
                title: "Ngày cập nhật",
                dataIndex: "updatedAt",
                render: (time) => moment(time).format("DD/MM/YYYY HH:mm"),
            },
            {
                title: "Hành động",
                fixed: "right",
                width: 100,
                render: (text, record) => {
                    let lock = record.isLock ? record.isLock : false; 
                    return (
                        <>
                            <Ability roles={[PERMISSION_CODE.UPDATE]}>
                                <Popconfirm
                                    title={lock ? "Xác nhận mở khóa tài khoản này?" : "Xác nhận khóa tài khoản này"}
                                    placement="topLeft"
                                    okText="Đồng ý"
                                    cancelText="Huỷ"
                                    okType="danger"
                                    icon={
                                        <QuestionCircleOutlined
                                            style={{ color: "red" }}
                                        />
                                    }
                                    onConfirm={(e) => ocLock(e, record, !lock)}
                                >
                                    <Tooltip title={lock ? "Mở khóa" : 'Khóa'}>
                                        <Button type="link" danger icon={lock? <AiFillUnlock /> : <AiFillLock />} />
                                    </Tooltip>
                                </Popconfirm>
                            </Ability>
                        </>
                    );
                },
            }
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

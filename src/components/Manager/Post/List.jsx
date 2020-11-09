import React, { Component } from "react";
import { Table, Button, Popconfirm, Tooltip } from "antd";
import PropTypes from "prop-types";
import { FiTrash } from "react-icons/fi";
import { QuestionCircleOutlined } from "@ant-design/icons";
import moment from "moment";
import Ability from "containers/Ability";
import { PERMISSION_CODE } from "constants/global";

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
        } = this.props;
        const columns = [
            {
                title: "ID",
                dataIndex: "shortCode",
                width: 120,
                fixed: "left",
            },
            {
                title: "Người viết",
                dataIndex: "user",
                render: (user, record) => <a href={record.link}>{user.fullName}</a>,
            },
            {
                title: "Nội dung",
                dataIndex: "content",
                render: (content, record) => content,
            },
            {
                title: "Lượt bình luận",
                render: (record) => {
                    let binhLuan = 0;
                    if(record.comment) {
                        binhLuan = binhLuan + record.comment;
                    }
                    if(record.reply) {
                        binhLuan = binhLuan +  record.reply;
                    }
                    return binhLuan;
                }
            },
            {
                title: "Lượt thích",
                dataIndex: "likeStats",
                render: (likeStats, record) => {
                    let total = 0;
                    if(likeStats) {
                        if(likeStats[0]) {
                            total = likeStats[0].total;
                        }
                    }
                    return total;
                }
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
                render: (text, record) => (
                    <>
                        {/* <Ability roles={[PERMISSION_CODE.UPDATE]}>
                            <Tooltip title="Sửa">
                                <Button
                                    type="link"
                                    icon={<FiEdit3 />}
                                    onClick={(e) => onEdit(e, record)}
                                />
                            </Tooltip>
                        </Ability> */}
                        <Ability roles={[PERMISSION_CODE.DELETE]}>
                            <Popconfirm
                                title="Xác nhận xoá thể loại này?"
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
                ),
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

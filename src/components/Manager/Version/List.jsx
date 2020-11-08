import React, { Component } from "react";
import { Table, Button, Popconfirm } from "antd";
import PropTypes from "prop-types";
import { FiTrash, FiEdit3 } from "react-icons/fi";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { PERMISSION_CODE } from "constants/global";
import Ability from "containers/Ability";

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
                dataIndex: "shortCode",
                width: 40,
                render: (text, record) => record.versionCode,
            },
            {
                title: "Phiên bản",
                width: 40,
                dataIndex: "title",
                render: (text, record) => record.versionName,
            },
            {
                title: "Cưỡng chế update",
                dataIndex: "thumbnail",
                width: 80,
                render: (text, record) => record.isUpdate ? 'Có' : '' 
            },
            {
                title: "Hành động",
                width: 80,
                render: (text, record) => (
                    <>
                        <Ability roles={[PERMISSION_CODE.UPDATE]}>
                            <Button
                                type="link"
                                icon={<FiEdit3 />}
                                onClick={(e) => onEdit(e, record)}
                            />
                        </Ability>
                        <Ability roles={[PERMISSION_CODE.DELETE]}>
                            <Popconfirm
                                title="Xác nhận phiên bản này?"
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
                                <Button type="link" danger icon={<FiTrash />} />
                            </Popconfirm>
                        </Ability>
                    </>
                ),
            },
        ];
        return (
            <Table
                size="small"
                // scroll={{ x: "100vw" }}
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

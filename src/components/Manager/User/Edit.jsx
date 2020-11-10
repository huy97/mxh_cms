import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Drawer,
    Form,
    Input,
    Button,
    notification,
} from "antd";
import { updateUser } from "services/auth";
import { getCDN, initFields } from "utils";
import moment from "moment";

export default class Create extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onSuccess: PropTypes.func,
        onClose: PropTypes.func,
    };

    static defaultProps = {
        visible: false,
        onSuccess: () => {},
        onClose: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            avatar: "",
            avatarData: "",
            fields: [],
        };
    }


    handleSubmit = async ({ fullName, newPassword, isVip, vipExpiredTime }) => {
        const { onSuccess, editData } = this.props;
        try {
            if (!fullName) {
                this.form.submit();
                return;
            }
            const result = await updateUser(
                editData._id,
                fullName,
                newPassword
            );
            notification.success({
                message: "Cập nhật người dùng thành công",
            });
            onSuccess(result.data);
            this.handleClose();
        } catch (e) {
            if (e.errors && e.errors.length) {
                let fields = e.errors.map((obj) => {
                    return {
                        name: [obj.param],
                        value: obj.value,
                        errors: [obj.msg],
                    };
                });
                this.form.setFields(fields);
            }
            notification.error({ message: e.message });
        }
    };

    handleClose = () => {
        this.setState({ avatar: "", avatarData: "" });
        this.props.onClose();
    };

    CustomFooter = () => {
        return (
            <div
                style={{
                    textAlign: "right",
                }}
            >
                <Button
                    onClick={this.handleClose}
                    style={{
                        float: "left",
                    }}
                >
                    Đóng
                </Button>
                <Button onClick={this.handleSubmit} type="primary">
                    Lưu thông tin
                </Button>
            </div>
        );
    };

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (snapshot.isEdit) {
            let initData = {
                fullName: snapshot.editData.fullName,
                username: snapshot.editData.username,
                isVip: snapshot.editData.isVip,
                vipExpiredTime: snapshot.editData.vipExpiredTime ? moment(snapshot.editData.vipExpiredTime) : null,
            };
            let fields = initFields(initData);
            this.setState({
                avatar: snapshot.editData.avatar,
                avatarData: getCDN(snapshot.editData.avatar),
                fields: fields,
            });
        }
    };

    getSnapshotBeforeUpdate = (prevProps) => {
        return {
            isEdit: prevProps.editData !== this.props.editData && !!this.props.editData._id,
            editData: this.props.editData,
        };
    };

    render() {
        const { fields } = this.state;
        const { visible } = this.props;
        return (
            <div>
                <Drawer
                    title="Sửa người dùng"
                    placement="right"
                    width={500}
                    closable={true}
                    destroyOnClose={true}
                    onClose={this.handleClose}
                    visible={visible}
                    footer={this.CustomFooter()}
                >
                    <Form
                        ref={(el) => (this.form = el)}
                        fields={fields}
                        onFinish={this.handleSubmit}
                        layout="vertical"
                    >
                        <Form.Item
                            name="fullName"
                            label="Tên hiển thị"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên hiển thị",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên hiển thị" />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label="Tên đăng nhập"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên đăng nhập",
                                },
                            ]}
                        >
                            <Input disabled placeholder="Nhập tên đăng nhập" />
                        </Form.Item>
                        <Form.Item name="newPassword" label="Mật khẩu mới">
                            <Input
                                type="newPassword"
                                placeholder="Nhập mật khẩu mới"
                            />
                        </Form.Item>
                        
                    </Form>
                </Drawer>
            </div>
        );
    }
}

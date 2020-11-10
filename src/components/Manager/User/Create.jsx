import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Drawer,
    Form,
    Input,
    Button,
    notification,
} from "antd";
import { createUser } from "services/auth";
import { setFormErrors } from "utils";

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
        };
    }


    handleSubmit = async ({
        fullName,
        username,
        password,
    }) => {
        const { onSuccess } = this.props;
        try {
            if (!fullName) {
                this.form.submit();
                return;
            }
            const result = await createUser(
                fullName,
                username,
                password);
            notification.success({
                message: "Tạo người dùng thành công",
            });
            onSuccess(result.data);
            this.handleClose();
        } catch (e) {
            setFormErrors(this.form, e.errors);
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
                    Tạo người dùng
                </Button>
            </div>
        );
    };

    render() {
        const { visible } = this.props;
        return (
            <div>
                <Drawer
                    title="Thêm người dùng"
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
                        fields={[]}
                        initialValues={{
                            fullName: "",
                            username: "",
                            password: "",
                        }}
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
                            <Input placeholder="Nhập tên đăng nhập" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Mật khẩu"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập mật khẩu",
                                },
                            ]}
                        >
                            <Input
                                type="password"
                                placeholder="Nhập mật khẩu"
                            />
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

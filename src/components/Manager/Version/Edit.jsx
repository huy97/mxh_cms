import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Drawer,
    Form,
    Input,
    Select,
    Button,
    notification,
    Checkbox,
} from "antd";
import styles from "./index.module.scss";
import { updateVersion } from "services/version";
import {initFields } from "utils";

export default class Edit extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        editData: PropTypes.object.isRequired,
        artists: PropTypes.array,
        categories: PropTypes.array,
        onSuccess: PropTypes.func,
        onClose: PropTypes.func,
    };

    static defaultProps = {
        visible: false,
        artists: [],
        categories: [],
        onSuccess: () => {},
        onClose: () => {},
    };

    constructor(props) {
        super(props);
        this.state = {
            fields: [],
        };
    }

    handleSubmit = async ({
        versionCode,
        versionName,
        os,
        desc,
        isUpdate,
    }) => {
        const { onSuccess, onClose, editData } = this.props;
        try {
            if (!versionCode) {
                this.form.submit();
                return;
            }
            let data = {
                id: editData._id,
                versionName,
                os,
                desc,
                isUpdate,
            };
            const result = await updateVersion(data);
            notification.success({ message: "Lưu thông tin thành công" });
            onSuccess(result.data);
            onClose();
        } catch (e) {
            notification.error({ message: e.message });
        }
    };

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (snapshot.isEdit) {
            let initData = {
                versionCode: snapshot.editData.versionCode,
                versionName: snapshot.editData.versionName,
                os: snapshot.editData.os.toString(),
                desc: snapshot.editData.desc,
                isUpdate: snapshot.editData.isUpdate,
            };
            let fields = initFields(initData);
            this.setState({
                fields: fields,
            });
        }
    };

    getSnapshotBeforeUpdate = (prevProps) => {
        return {
            isEdit:
                prevProps.editData !== this.props.editData && !!this.props.editData._id,
            editData: this.props.editData,
        };
    };

    CustomFooter = () => {
        const { onClose } = this.props;
        return (
            <div
                style={{
                    textAlign: "right",
                }}
            >
                <Button
                    onClick={onClose}
                    style={{
                        float: "left",
                    }}
                >
                    Đóng
                </Button>
                <Button onClick={this.handleSubmit} type="primary">
                    Lưu thay đổi
                </Button>
            </div>
        );
    };

    render() {
        const {fields} = this.state;
        const { visible, onClose} = this.props;
        return (
            <div>
                <Drawer
                    title="Sửa phiên bản"
                    width={400}
                    placement="right"
                    closable={true}
                    maskClosable={false}
                    onClose={onClose}
                    visible={visible}
                    footer={this.CustomFooter()}
                >
                    <div className={styles.form}>
                        <Form
                            ref={(el) => (this.form = el)}
                            onFinish={this.handleSubmit}
                            layout="vertical"
                            fields={fields}
                            style={{
                                flex: 1,
                                marginLeft: 10,
                            }}
                        >
                            <Form.Item name="os" label="Hệ điều hành">
                                <Select placeholder="Chọn phiên bản">
                                    <Select.Option value="1">Android</Select.Option>
                                    <Select.Option value="2">IOS</Select.Option>
                                </Select>
                                </Form.Item>
                                <Form.Item
                                name="versionCode"
                                label="Mã phiên bản"
                                rules={[
                                    {
                                    required: true,
                                    message: "Vui lòng nhập mã phiên bản",
                                    },
                                ]}
                                >
                                <Input placeholder="Nhập mã phiên bản" />
                                </Form.Item>
                                <Form.Item
                                name="versionName"
                                label="Tên phiên bản"
                                rules={[
                                    {
                                    required: true,
                                    message: "Vui lòng nhập tên phiên bản",
                                    },
                                ]}
                                >
                                <Input placeholder="Nhập tên phiên bản" />
                                </Form.Item>
                                
                                <Form.Item name="isUpdate" valuePropName="checked">
                                <Checkbox>Cưỡng chế update</Checkbox>
                                </Form.Item>
                                <Form.Item label="Có gì mới trong bản cập nhật này">
                                    <Input.TextArea name="desc" />
                                </Form.Item>   
                        </Form>
                    </div>
                </Drawer>
            </div>
        );
    }
}

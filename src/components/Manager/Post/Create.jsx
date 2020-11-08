import React, { Component } from "react";
import PropTypes from "prop-types";
import { Drawer, Form, Input, Upload, Button, notification } from "antd";
import { FiUpload } from "react-icons/fi";
import { uploadMedia } from "services/media";
import { createCategory } from "services/category";
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
            thumbnail: "",
            thumbnailData: "",
            cover: "",
            coverData: "",
        };
    }

    handleUpload = async (
        { file, onSuccess, onError, onProgress },
        type = 1
    ) => {
        try {
            const result = await uploadMedia(file, (e) => {
                onProgress({
                    percent: Math.ceil(e.loaded / e.total) * 100,
                });
            });
            let frd = new FileReader();
            frd.onload = ({ target }) => {
                if (type === 1) {
                    this.setState({
                        thumbnailData: target.result,
                        thumbnail: result.data.minimizePath,
                    });
                } else {
                    this.setState({
                        coverData: target.result,
                        cover: result.data.filePath,
                    });
                }
            };
            frd.readAsDataURL(file);
        } catch (e) {}
    };

    handleSubmit = async ({ title, description }) => {
        const { thumbnail, cover } = this.state;
        const { onSuccess } = this.props;
        try {
            if (!title) {
                this.form.submit();
                return;
            }
            let data = {
                title,
                description,
                thumbnail,
                cover,
            };
            const result = await createCategory(data);
            notification.success({
                message: "Tạo thể loại thành công",
            });
            onSuccess(result.data);
            this.handleClose();
        } catch (e) {
            setFormErrors(this.form, e.errors);
            notification.error({ message: e.message });
        }
    };

    handleClose = () => {
        this.setState({
            thumbnail: "",
            cover: "",
            thumbnailData: "",
            coverData: "",
        });
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
                    Tạo thể loại
                </Button>
            </div>
        );
    };

    render() {
        const { thumbnailData, coverData } = this.state;
        const { visible } = this.props;
        return (
            <div>
                <Drawer
                    title="Thêm danh mục"
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
                            title: "",
                            description: "",
                        }}
                        onFinish={this.handleSubmit}
                        layout="vertical"
                    >
                        <Form.Item label="Ảnh bìa" name="cover">
                            <Upload
                                name="cover"
                                accept="image/*"
                                listType="picture-card"
                                className="category-upload"
                                showUploadList={false}
                                customRequest={(e) => this.handleUpload(e, 0)}
                            >
                                {coverData ? (
                                    <img
                                        src={coverData}
                                        alt="Ảnh bìa"
                                        style={{
                                            width: "100%",
                                            height: 250,
                                        }}
                                    />
                                ) : (
                                    <FiUpload style={{ fontSize: 24 }} />
                                )}
                            </Upload>
                        </Form.Item>
                        <Form.Item label="Ảnh đại diện" name="thumbnail">
                            <Upload
                                name="thumbnail"
                                accept="image/*"
                                listType="picture-card"
                                className="category-upload"
                                showUploadList={false}
                                customRequest={(e) => this.handleUpload(e, 1)}
                            >
                                {thumbnailData ? (
                                    <img
                                        src={thumbnailData}
                                        alt="Ảnh đại diện"
                                        style={{
                                            width: 150,
                                            height: 150,
                                        }}
                                    />
                                ) : (
                                    <FiUpload style={{ fontSize: 24 }} />
                                )}
                            </Upload>
                        </Form.Item>
                        <Form.Item
                            name="title"
                            label="Tên thể loại"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên thể loại",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên thể loại" />
                        </Form.Item>
                        <Form.Item name="description" label="Mô tả">
                            <Input.TextArea placeholder="Nhập mô tả" />
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

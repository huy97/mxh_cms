import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    Drawer,
    Form,
    Input,
    Upload,
    Button,
    notification,
    Checkbox,
} from "antd";
import { FiUpload } from "react-icons/fi";
import { uploadMedia } from "services/media";
import { getCDN, initFields } from "utils";
import { updateArtist } from "services/artist";

export default class Edit extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        editData: PropTypes.object.isRequired,
        onSuccess: PropTypes.func,
        onClose: PropTypes.func,
    };

    static defaultProps = {
        visible: false,
        editData: {},
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
            fields: [],
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

    handleSubmit = async ({ fullName, isComposer }) => {
        const { thumbnail, cover } = this.state;
        const { onSuccess, editData } = this.props;
        try {
            if (!cover) {
                notification.error({ message: "Vui lòng tải lên ảnh bìa!" });
                return;
            }
            if (!thumbnail) {
                notification.error({
                    message: "Vui lòng tải lên ảnh đại diện!",
                });
                return;
            }
            if (!fullName) {
                this.form.submit();
                return;
            }
            let data = {
                fullName,
                isComposer,
                thumbnail,
                cover,
            };
            const result = await updateArtist(editData._id, data);
            notification.success({
                message: "Cập nhật nghệ sĩ thành công",
            });
            onSuccess(result.data);
            this.handleClose();
        } catch (e) {
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
                    Lưu thay đổi
                </Button>
            </div>
        );
    };

    componentDidUpdate = (prevProps, prevState, snapshot) => {
        if (snapshot.isEdit) {
            let initData = {
                fullName: snapshot.editData.fullName,
                isComposer: snapshot.editData.isComposer,
            };
            let fields = initFields(initData);
            this.setState({
                thumbnail: snapshot.editData.thumbnail,
                thumbnailData: getCDN(snapshot.editData.thumbnail),
                cover: snapshot.editData.cover,
                coverData: getCDN(snapshot.editData.cover),
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

    render() {
        const { thumbnailData, coverData, fields } = this.state;
        const { visible } = this.props;
        return (
            <div>
                <Drawer
                    title="Sửa nghệ sĩ"
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
                        initialValues={{
                            fullName: "",
                            isComposer: false,
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
                            name="fullName"
                            label="Tên nghệ sĩ"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập tên nghệ sĩ",
                                },
                            ]}
                        >
                            <Input placeholder="Nhập tên nghệ sĩ" />
                        </Form.Item>
                        <Form.Item name="isComposer" valuePropName="checked">
                            <Checkbox>Ca sĩ - Nhạc sĩ</Checkbox>
                        </Form.Item>
                    </Form>
                </Drawer>
            </div>
        );
    }
}

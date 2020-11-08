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
import { MEDIA_TYPE } from "constants/global";
import { uploadMedia } from "services/media";
import { createVersion } from "services/version";

export default class Create extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
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
      thumbnail: "",
      thumbnailMedium: "",
      thumbnailData: "",
      isUploadThumbnail: false,
      fileList: [],
      medias: [],
    };
  }

  handleUploadFile = async (
    { file, onSuccess, onError, onProgress },
    isThumbnail = false
  ) => {
    try {
      let { medias, fileList } = this.state;
      if (isThumbnail) {
        medias = medias.filter(
          (obj) => obj.media.mediaType !== MEDIA_TYPE.IMAGE
        );
        this.setState({ isUploadThumbnail: true, medias, thumbnailData: "" });
      }
      const result = await uploadMedia(file, (e) => {
        onProgress({
          percent: Math.ceil(e.loaded / e.total) * 100,
        });
      });
      if (result.data.mediaType === MEDIA_TYPE.IMAGE) {
        if (isThumbnail) {
          let frd = new FileReader();
          frd.onload = ({ target }) => {
            this.setState({
              thumbnailData: target.result,
              thumbnailMedium: result.data.filePath,
              thumbnail: result.data.minimizePath,
            });
          };
          frd.readAsDataURL(file);
        }
      } else {
        fileList.push(file);
      }
      medias.push({ uid: file.uid, media: result.data, fileList });
      this.setState(
        {
          medias,
          isUploadThumbnail: false,
        },
        () => onSuccess()
      );
    } catch (e) {
      if (isThumbnail) {
        this.setState({ isUploadThumbnail: false });
      }
      onError(e);
    }
  };

  handleRemoveFile = (file) => {
    let { medias, fileList } = this.state;
    fileList = fileList.filter((media) => media.uid !== file.uid);
    medias = medias.filter((media) => media.uid !== file.uid);
    this.setState({ medias, fileList });
  };

  handleSubmit = async ({
    versionCode,
    versionName,
    os,
    desc,
    isUpdate,
  }) => {
    const { onSuccess } = this.props;
    try {
      if (!versionCode) {
        this.form.submit();
        return;
      }
      let data = {
        versionCode,
        versionName,
        os,
        desc,
        isUpdate: isUpdate.toString(),
      };
      const result = await createVersion(data);
      notification.success({
        message: "Tạo phiên bản thành công",
      });
      onSuccess(result.data);
      this.handleClose();
    } catch (e) {
      notification.error({ message: e.message });
    }
  };

  handleClose = () => {
    const { onClose } = this.props;
    this.setState({
      thumbnail: "",
      thumbnailData: "",
      fileList: [],
      medias: [],
    });
    onClose();
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
          Tạo phiên bản
        </Button>
      </div>
    );
  };

  render() {
    const { visible } = this.props;
    return (
      <div>
        <Drawer
          title="Thêm phiên bản"
          width={400}
          placement="right"
          closable={true}
          maskClosable={false}
          onClose={this.handleClose}
          visible={visible}
          footer={this.CustomFooter()}
        >
            <div className={styles.form}>
              <Form
                ref={(el) => (this.form = el)}
                onFinish={this.handleSubmit}
                layout="vertical"
                initialValues={{
                  versionCode: "",
                  versionName: "",
                  os: "1",
                  desc: "",
                  isUpdate: true,
                }}
                fields={[]}
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
          {/* ) : null} */}
        </Drawer>
      </div>
    );
  }
}
